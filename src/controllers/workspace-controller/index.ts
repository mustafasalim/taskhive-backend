import { Request, Response } from "express"
import Workspace from "../../models/workspace-model"

export const createWorkspace = async (req: Request, res: Response) => {
  const { name, description } = req.body
  const ownerId = req?.user?.userId

  if (!ownerId) {
    return res.status(400).json({ message: "User not authenticated" }) // Check if ownerId is not null
  }

  try {
    const workspace = await Workspace.create({
      name,
      description,
      owner: ownerId,
      members: [{ user: ownerId, role: "admin" }],
    })
    res.status(201).json(workspace)
  } catch (error) {
    res.status(500).json({ message: "Error creating workspace", error })
  }
}

export const getUserWorkspaces = async (req: Request, res: Response) => {
  const userId = req.user?.userId

  try {
    const workspaces = await Workspace.find({ owner: userId })
    res.status(200).json(workspaces)
  } catch (error) {
    console.error("Error fetching user workspaces:", error)
    res.status(500).json({ message: "Error fetching user workspaces", error })
  }
}
