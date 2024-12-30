import Issue from "../../models/issue-model"
import Status from "../../models/status-model"
import { Request, Response } from "express"

export const createStatus = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const { name, order } = req.body

  try {
    const status = await Status.create({ name, project: projectId, order })
    res.status(201).json(status)
  } catch (error) {
    console.error("Error creating status:", error)
    res.status(500).json({ message: "Error creating status", error })
  }
}

export const getStatusesByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params

  try {
    const statuses = await Status.find({ project: projectId }).sort({
      order: 1,
    })
    res.status(200).json(statuses)
  } catch (error) {
    console.error("Error fetching statuses:", error)
    res.status(500).json({ message: "Error fetching statuses", error })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  const { statusId } = req.params
  const { name, order } = req.body

  try {
    const status = await Status.findByIdAndUpdate(
      statusId,
      { name, order },
      { new: true }
    )

    if (!status) {
      return res.status(404).json({ message: "Status not found" })
    }

    res.status(200).json(status)
  } catch (error) {
    console.error("Error updating status:", error)
    res.status(500).json({ message: "Error updating status", error })
  }
}

export const deleteStatus = async (req: Request, res: Response) => {
  const { statusId } = req.params

  try {
    const issuesWithStatus = await Issue.find({ status: statusId })
    if (issuesWithStatus.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete a status with assigned issues" })
    }

    const status = await Status.findByIdAndDelete(statusId)

    if (!status) {
      return res.status(404).json({ message: "Status not found" })
    }

    res.status(200).json({ message: "Status deleted successfully" })
  } catch (error) {
    console.error("Error deleting status:", error)
    res.status(500).json({ message: "Error deleting status", error })
  }
}
