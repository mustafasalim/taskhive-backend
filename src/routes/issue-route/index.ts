import express from "express"

import { verifyToken } from "../../middleware/verify-token"
import {
  addIssueToStatus,
  getIssuesByStatus,
  updateIssue,
  getIssueById,
} from "../../controllers/issue-controller"
import {
  createComment,
  getCommentsByIssue,
} from "../../controllers/comment-controller"

const router: any = express.Router()

router.post("/:statusId/issues/create", verifyToken, addIssueToStatus)
router.get("/:statusId/issues", verifyToken, getIssuesByStatus)
router.put("/issues/:issueId/update", verifyToken, updateIssue)
router.get("/issues/:issueId", verifyToken, getIssueById)
router.post("/:issueId/issues/comments/create", verifyToken, createComment)
router.get("/:issueId/issues/comments", verifyToken, getCommentsByIssue)

export default router
