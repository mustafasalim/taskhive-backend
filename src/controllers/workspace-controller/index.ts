import { Request, Response } from "express"
import Workspace from "../../models/workspace-model"
import { User } from "../../models/user-model"
import Project from "../../models/project-model"
import Issue from "../../models/issue-model"
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
  const { workspaceId } = req.params
  const loggedInUserId = req.user?.userId

  try {
    const activeWorkspace = await Workspace.findById(workspaceId)
      .populate("owner", "name email _id")
      .select("name description owner members")

    if (!activeWorkspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    if (!loggedInUserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this workspace" })
    }

    const userRole = activeWorkspace.members.find(
      (member) => member.user.toString() === loggedInUserId.toString()
    )?.role

    const memberIds = activeWorkspace.members.map((member) =>
      member.user.toString()
    )

    const response = {
      ...activeWorkspace.toObject(),
      members: memberIds,
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

    // Remove user from workspace members
    await Workspace.findByIdAndUpdate(workspaceId, {
      $pull: { members: { user: loggedInUserId } },
    })

    // Find all projects in the workspace and remove the user from each
    await Project.updateMany(
      { workspace: workspaceId },
      { $pull: { members: loggedInUserId } } // Remove user from project members
    )

    res.status(200).json({
      message:
        "You have successfully left the workspace and associated projects",
    })
  } catch (error) {
    console.error("Error leaving workspace:", error)
    res.status(500).json({ message: "Error leaving workspace", error })
  }
}

export const getWorkspaceMembers = async (req: Request, res: Response) => {
  const { workspaceId } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID" })
    }

    const workspace = await Workspace.findById(workspaceId)
      .populate({
        path: "members.user",
        select: "name email _id",
      })
      .lean()

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    const members = workspace.members.map((member: any) => ({
      id: member.user._id,
      name: member.user.name,
      email: member.user.email,
      role: member.role,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    }))

    res.status(200).json(members)
  } catch (error) {
    console.error("Error fetching workspace members:", error)
    res.status(500).json({ message: "Error fetching workspace members", error })
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

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const { workspaceId, memberId } = req.params
    const { role } = req.body
    const userId = req.user?.userId

    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceId)
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    // Check if user has permission (only admin and operator can update roles)
    const currentUserMember = workspace.members.find(
      (member) => member.user.toString() === userId?.toString()
    )
    if (
      !currentUserMember ||
      (currentUserMember.role !== "admin" &&
        currentUserMember.role !== "operator")
    ) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update roles" })
    }

    // Check if target member exists
    const memberIndex = workspace.members.findIndex(
      (member) => member.user.toString() === memberId
    )
    if (memberIndex === -1) {
      return res.status(404).json({ message: "Member not found" })
    }

    // Prevent changing workspace owner's role
    if (workspace.owner.toString() === memberId) {
      return res
        .status(403)
        .json({ message: "Cannot change workspace owner's role" })
    }

    // Validate role
    const validRoles = ["admin", "operator", "member", "viewer"]
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    // Update member's role
    workspace.members[memberIndex].role = role
    await workspace.save()

    return res.status(200).json({ message: "Role updated successfully" })
  } catch (error) {
    console.error("Error updating member role:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
