import { Request, Response } from "express"
import { generateInviteCode } from "../../utils/generate-invite-code"
import Invitation from "../../models/invation-model"
import Workspace from "../../models/workspace-model"
import { sendWorkspaceInviteCodeEmail } from "../../nodemailer/emails"

export const inviteUser = async (req: Request, res: Response) => {
  const { email, workspaceId } = req.body

  try {
    const inviteCode = generateInviteCode()

    const assignedRole = "member"

    const invitation = await Invitation.create({
      email,
      workspace: workspaceId,
      role: assignedRole,
      inviteCode,
      status: "pending",
    })

    await sendWorkspaceInviteCodeEmail({
      email,
      inviteCode,
    })

    res
      .status(201)
      .json({ message: "Invitation created successfully", inviteCode })
  } catch (error) {
    console.error("Error creating invitation:", error)
    res.status(500).json({ message: "Error creating invitation", error })
  }
}

export const joinWorkspaceWithCode = async (req: Request, res: Response) => {
  const { inviteCode } = req.body // Code entered by the user
  const userId = req?.user?.userId

  try {
    // Find the invitation by code
    const invitation = await Invitation.findOne({
      inviteCode,
      status: "pending",
    })
    if (!invitation) {
      return res
        .status(404)
        .json({ message: "Invalid or expired invitation code" })
    }

    // Check if the user is already a member of the workspace
    const workspace = await Workspace.findById(invitation.workspace)
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" })
    }

    const isMember = workspace.members.some(
      (member) => member.user.toString() === userId?.toString()
    )
    if (isMember) {
      return res
        .status(400)
        .json({ message: "You are already a member of this workspace" })
    }

    // Add user to workspace with the role specified in the invitation
    workspace.members.push({ user: userId, role: invitation.role })
    await workspace.save()

    // Mark the invitation as accepted
    invitation.status = "accepted"
    await invitation.save()

    res
      .status(200)
      .json({ message: "Successfully joined the workspace", workspace })
  } catch (error) {
    console.error("Error joining workspace with code:", error)
    res.status(500).json({ message: "Error joining workspace", error })
  }
}
