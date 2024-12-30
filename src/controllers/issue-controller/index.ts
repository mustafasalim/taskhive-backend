import { Request, Response } from "express"
import Issue from "../../models/issue-model"

export const addIssueToStatus = async (req: Request, res: Response) => {
  const { statusId } = req.params
  const { title, description, assignedTo } = req.body

  try {
    const issue = await Issue.create({
      title,
      description,
      status: statusId,
      assignedTo,
    })

    res.status(201).json(issue)
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
      "name"
    )
    res.status(200).json(issues)
  } catch (error) {
    console.error("Error fetching issues by status:", error)
    res.status(500).json({ message: "Error fetching issues by status", error })
  }
}
