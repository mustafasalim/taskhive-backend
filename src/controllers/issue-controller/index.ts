import { Request, Response } from "express"
import Issue from "../../models/issue-model"
import Status from "../../models/status-model"

export const addIssueToStatus = async (req: Request, res: Response) => {
  const { statusId } = req.params
  const { title, description, assignedTo = [], priority } = req.body

  try {
    const status = await Status.findById(statusId)
    if (!status) {
      return res.status(404).json({ message: "Status not found" })
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

export const getIssuesByStatus = async (req: Request, res: Response) => {
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
