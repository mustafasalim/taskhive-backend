import { Request, Response } from "express"
import Project from "../../models/project-model"
import Workspace from "../../models/workspace-model"
import mongoose from "mongoose"

export const createProject = async (req: Request, res: Response) => {
  const { name, description, workspaceId } = req.body // Remove members from req.body
  const userId = req.user?.userId

  try {
    const workspace = await Workspace.findById(workspaceId)
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    const isMember = workspace.members.some(
      (member) => member.user.toString() === userId?.toString()
    )
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this workspace" })
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      members: [userId],
    })

    res.status(201).json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    res.status(500).json({ message: "Error creating project", error })
  }
}

export const getProjectsByWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params
  const loggedInUserId = req.user?.userId // Assuming req.user is set by auth middleware

  try {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID" })
    }

    const objectIdWorkspaceId = new mongoose.Types.ObjectId(workspaceId)

    // Find projects in the workspace where the logged-in user is a member
    const projects = await Project.find({
      workspace: objectIdWorkspaceId,
      members: loggedInUserId, // Filter for projects where the user is a member
    })
      .select("-updatedAt") // Exclude updatedAt field from project
      .populate({
        path: "members",
        select: "name _id", // Include both name and _id for members
      })
      .populate({
        path: "workspace",
        select: "name",
        populate: {
          path: "owner",
          select: "name -_id",
        },
      })

    // If no projects found, return an empty array
    if (!projects || projects.length === 0) {
      return res.status(200).json([])
    }

    // Format the response data
    const formattedProjects = projects.map((project: any) => ({
      name: project.name,
      description: project.description,
      workspaceName: project.workspace.name,
      ownerName: project.workspace.owner?.name || null,
      members: project.members.map((member: any) => ({
        id: member._id, // Include member ID
        name: member.name, // Include member name
      })),
      createdAt: project.createdAt,
      id: project._id,
    }))

    res.status(200).json(formattedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(500).json({ message: "Error fetching projects", error })
  }
}
export const getProjectById = async (req: Request, res: Response) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId).populate(
      "members",
      "name email"
    )
    if (!project) return res.status(404).json({ message: "Project not found" })

    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error })
  }
}

export const addMembersToProject = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const { members } = req.body

  try {
    const project = await Project.findById(projectId).populate("workspace")
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const workspace = await Workspace.findById(project.workspace)
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    // Validate members: ensure all provided members are part of the workspace
    const validMembers = members.filter((memberId: any) =>
      workspace.members.some((member) => member.user.toString() === memberId)
    )

    if (validMembers.length === 0) {
      return res.status(400).json({
        message: "None of the provided members are part of the workspace",
      })
    }

    // Replace the project's members with the validated members
    project.members = validMembers

    await project.save()

    res.status(200).json({
      message: "Project members replaced successfully",
      members: project.members,
    })
  } catch (error) {
    console.error("Error replacing project members:", error)
    res.status(500).json({ message: "Error replacing project members", error })
  }
}

export const updateProjectDetails = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const { title, description } = req.body

  try {
    // Find the project by ID
    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Update title and description if provided
    if (title) project.name = title
    if (description) project.description = description

    // Save the updated project
    await project.save()

    res.status(200).json({ message: "Project updated successfully", project })
  } catch (error) {
    console.error("Error updating project:", error)
    res.status(500).json({ message: "Error updating project", error })
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const loggedInUserId = req.user?.userId

  try {
    const project = await Project.findById(projectId).populate("workspace")

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const workspace = await Workspace.findById(project.workspace)
    const isWorkspaceOwner = workspace?.owner.toString() === loggedInUserId
    const isProjectCreator = project.members.includes(loggedInUserId as any)

    if (!isWorkspaceOwner && !isProjectCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this project" })
    }

    await Project.findByIdAndDelete(projectId)

    res.status(200).json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    res.status(500).json({ message: "Error deleting project", error })
  }
}

export const leaveProject = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const loggedInUserId = req.user?.userId

  try {
    // Find the project by ID
    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Check if the user is a member of the project
    const isMember = project.members.some(
      (member) => member.toString() === loggedInUserId
    )
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this project" })
    }

    // Prevent the project creator from leaving the project
    const isProjectCreator = project.members[0].toString() === loggedInUserId
    if (isProjectCreator) {
      return res
        .status(403)
        .json({ message: "Project creator cannot leave the project" })
    }

    // Remove the user from the members array
    project.members = project.members.filter(
      (member) => member.toString() !== loggedInUserId
    )

    // Save the updated project
    await project.save()

    res.status(200).json({ message: "You have successfully left the project" })
  } catch (error) {
    console.error("Error leaving project:", error)
    res.status(500).json({ message: "Error leaving project", error })
  }
}
