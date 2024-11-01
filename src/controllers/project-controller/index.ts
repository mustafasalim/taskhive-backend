import { Request, Response } from "express"
import Project from "../../models/project-model"
import Workspace from "../../models/workspace-model"
import mongoose from "mongoose"

export const createProject = async (req: Request, res: Response) => {
  const { name, description, workspaceId, members } = req.body
  const userId = req.user?.userId

  try {
    const workspace = await Workspace.findById(workspaceId)
    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" })

    const isMember = workspace.members.some(
      (member) => member.user.toString() === userId?.toString()
    )
    if (!isMember)
      return res
        .status(403)
        .json({ message: "You are not a member of this workspace" })

    const uniqueMembers = Array.from(new Set([userId, ...(members || [])]))

    // Create the project
    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      members: uniqueMembers,
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error })
  }
}

export const getProjectsByWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID" })
    }

    const objectIdWorkspaceId = new mongoose.Types.ObjectId(workspaceId)

    const projects = await Project.find({
      workspace: objectIdWorkspaceId,
    })
      .select("-_id -updatedAt")
      .populate({
        path: "members",
        select: "name -_id",
      })
      .populate({
        path: "workspace",
        select: "name",
        populate: {
          path: "owner",
          select: "name -_id",
        },
      })

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this workspace" })
    }

    const formattedProjects = projects.map((project: any) => ({
      name: project.name,
      description: project.description,
      workspaceName: project.workspace.name,
      ownerName: project.workspace.owner?.name || null,
      members: project.members.map((member: any) => member.name),
      createdAt: project.createdAt,
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

    const validMembers = members.filter((memberId: any) =>
      workspace.members.some((member) => member.user.toString() === memberId)
    )

    if (validMembers.length === 0) {
      return res.status(400).json({
        message: "None of the provided members are part of the workspace",
      })
    }

    project.members = Array.from(new Set([...project.members, ...validMembers]))

    await project.save()

    res.status(200).json({
      message: "Members added to project successfully",
      members: project.members,
    })
  } catch (error) {
    console.error("Error adding members to project:", error)
    res.status(500).json({ message: "Error adding members to project", error })
  }
}
