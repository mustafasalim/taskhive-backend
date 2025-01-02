import { Request, Response } from "express"
import { AccessToken } from "livekit-server-sdk"
import Issue from "../../models/issue-model"
import Status from "../../models/status-model"

export const addIssueToStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { statusId } = req.params
  const { title, description, assignedTo = [], priority } = req.body

  try {
    const status = await Status.findById(statusId)
    if (!status) {
      res.status(404).json({ message: "Status not found" })
      return
    }

    const issue = await Issue.create({
      title,
      description,
      status: statusId,
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
      priority,
      project: status.project,
    })

    const populatedIssue = await issue.populate("assignedTo", "_id name email")
    res.status(201).json(populatedIssue)
  } catch (error) {
    console.error("Error adding issue to status:", error)
    res.status(500).json({ message: "Error adding issue to status", error })
  }
}

export const getIssuesByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { statusId } = req.params

  try {
    const issues = await Issue.find({ status: statusId }).populate(
      "assignedTo",
      "_id name email"
    )
    res.status(200).json(issues)
  } catch (error) {
    console.error("Error fetching issues by status:", error)
    res.status(500).json({ message: "Error fetching issues by status", error })
  }
}

export const updateIssue = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { issueId } = req.params
  const { title, description, assignedTo, status, priority } = req.body

  try {
    const issue = await Issue.findById(issueId)
    if (!issue) {
      res.status(404).json({ message: "Issue not found" })
      return
    }

    // Update the issue with new values
    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(assignedTo && {
          assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
        }),
        ...(status && { status }),
        ...(priority && { priority }),
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("assignedTo", "_id name email")

    res.status(200).json(updatedIssue)
  } catch (error) {
    console.error("Error updating issue:", error)
    res.status(500).json({ message: "Error updating issue", error })
  }
}

export const getIssueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { issueId } = req.params

  try {
    const issue = await Issue.findById(issueId).populate(
      "assignedTo",
      "_id name email"
    )

    if (!issue) {
      res.status(404).json({ message: "Issue not found" })
      return
    }

    res.status(200).json(issue)
  } catch (error) {
    console.error("Error fetching issue:", error)
    res.status(500).json({ message: "Error fetching issue", error })
  }
}

export const getLiveKitToken = async (req: Request, res: Response) => {
  const room = req.query.room as string
  const username = req.query.username as string
  const userId = req.user?._id

  console.log("username", username)

  if (!room) {
    console.error("Room parameter is missing!")
    return res.status(400).json({ error: 'Missing "room" query parameter' })
  }

  if (!username) {
    console.error("Username parameter is missing!")
    return res.status(400).json({ error: 'Missing "username" query parameter' })
  }

  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!apiKey || !apiSecret) {
    console.error("LiveKit API key or secret is missing!")
    return res.status(500).json({ error: "Server misconfigured" })
  }

  try {
    console.log("Generating LiveKit token with:", {
      apiKey,
      apiSecret,
      room,
      username,
      userId,
    })

    const at = new AccessToken(apiKey, apiSecret, { identity: username })
    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    })

    const token = await at.toJwt()
    console.log("Generated Token:", token)

    return res.status(200).json({ token })
  } catch (error) {
    console.error("Error generating LiveKit token:", error)
    return res.status(500).json({ error: "Token generation failed" })
  }
}
