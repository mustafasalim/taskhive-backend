// src/controllers/projectController.ts
import { Request, Response } from "express"
import Project from "../../models/project-model"
import Workspace from "../../models/workspace-model"
import { ObjectId } from "mongodb"
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

    // Create the project
    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      members: [userId, ...(members || [])],
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
      .populate("members", "name email")
      .populate("workspace", "name owner")

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this workspace" })
    }

    res.status(200).json(projects)
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
