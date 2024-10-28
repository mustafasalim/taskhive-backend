import { Request, Response } from "express"
import Workspace from "../../models/workspace-model"
import Project from "../../models/project-model"
import mongoose from "mongoose"

export const createWorkspace = async (req: Request, res: Response) => {
  const { name, description } = req.body
  const ownerId = req?.user?.userId

  if (!ownerId) {
    return res.status(400).json({ message: "User not authenticated" })
  }

  try {
    const workspace = await Workspace.create({
      name,
      description,
      owner: ownerId,
      members: [{ user: ownerId, role: "admin" }],
    })

    const populatedWorkspace = await Workspace.findById(workspace._id).populate(
      "owner",
      "name email"
    )
    res.status(201).json(populatedWorkspace)
  } catch (error) {
    res.status(500).json({ message: "Error creating workspace", error })
  }
}

export const getUserWorkspaces = async (req: Request, res: Response) => {
  const userId = req.user?.userId

  try {
    const workspaces = await Workspace.find({
      $or: [{ owner: userId }, { "members.user": userId }],
    })
      .populate("owner", "name email")
      .select("-members") //
    res.status(200).json(workspaces)
  } catch (error) {
    console.error("Error fetching user workspaces:", error)
    res.status(500).json({ message: "Error fetching user workspaces", error })
  }
}

export const getActiveWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params // Workspace ID from request parameters
  const loggedInUserId = req.user?.userId // Assuming req.user is set by the authentication middleware

  try {
    // Fetch the workspace by ID and populate member details
    const activeWorkspace = await Workspace.findById(workspaceId).populate(
      "members.user",
      "name email _id"
    )

    if (!activeWorkspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    if (!loggedInUserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this workspace" })
    }

    // Find the role of the logged-in user in this workspace
    const userRole = activeWorkspace.members.find(
      (member) => member.user._id.toString() === loggedInUserId.toString()
    )?.role

    // Include the user's role in the response
    const response = {
      ...activeWorkspace.toObject(),
      currentUserRole: userRole,
    }

    res.status(200).json(response)
  } catch (error) {
    console.error("Error fetching active workspace:", error)
    res.status(500).json({ message: "Error fetching active workspace", error })
  }
}

export const leaveWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params
  const loggedInUserId = req.user?.userId

  try {
    const workspace = await Workspace.findById(workspaceId)

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    if (workspace.owner.toString() === loggedInUserId) {
      return res
        .status(403)
        .json({ message: "Owner cannot leave the workspace" })
    }

    const isMember = workspace.members.some(
      (member) => member.user.toString() === loggedInUserId
    )

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this workspace" })
    }

    await Workspace.findByIdAndUpdate(workspaceId, {
      $pull: { members: { user: loggedInUserId } },
    })

    res
      .status(200)
      .json({ message: "You have successfully left the workspace" })
  } catch (error) {
    console.error("Error leaving workspace:", error)
    res.status(500).json({ message: "Error leaving workspace", error })
  }
}

export const deleteWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params
  const userId = req.user?.userId

  try {
    console.log("Received workspaceId:", workspaceId)

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID" })
    }

    const workspace = await Workspace.findById(workspaceId)

    console.log("Found workspace:", workspace)

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    if (workspace.owner.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this workspace" })
    }

    await Project.deleteMany({ workspace: workspaceId })

    await Workspace.deleteOne({ _id: workspaceId })

    res.status(200).json({ message: "Workspace deleted successfully" })
  } catch (error) {
    console.error("Error deleting workspace:", error)
    res.status(500).json({ message: "Error deleting workspace", error })
  }
}
