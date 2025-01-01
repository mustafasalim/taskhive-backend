import { Request, Response } from "express"
import Comment from "../../models/comment-model"
import Issue from "../../models/issue-model"
import { IUser } from "../../models/user-model"

interface AuthRequest extends Request {
  user?: IUser
}

export const createComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { issueId } = req.params
  const { content } = req.body
  const userId = req.user?.userId

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  try {
    const issue = await Issue.findById(issueId)
    if (!issue) {
      res.status(404).json({ message: "Issue not found" })
      return
    }

    const comment = await Comment.create({
      content,
      issue: issueId,
      author: userId,
    })

    const populatedComment = await comment.populate("author", "_id name email")
    res.status(201).json(populatedComment)
  } catch (error) {
    console.error("Error creating comment:", error)
    res.status(500).json({ message: "Error creating comment", error })
  }
}

export const getCommentsByIssue = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { issueId } = req.params

  try {
    const comments = await Comment.find({ issue: issueId })
      .populate("author", "_id name email")
      .sort({ createdAt: 1 })
    res.status(200).json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    res.status(500).json({ message: "Error fetching comments", error })
  }
}
