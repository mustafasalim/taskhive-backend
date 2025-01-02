import express from "express"

import { verifyToken } from "../../middleware/verify-token"
import {
  addIssueToStatus,
  getIssuesByStatus,
  updateIssue,
  getIssueById,
  getLiveKitToken,
  upload,
  updateIssueImages,
  deleteIssueImage,
  deleteIssue,
} from "../../controllers/issue-controller"
import {
  createComment,
  getCommentsByIssue,
} from "../../controllers/comment-controller"

const router: any = express.Router()

router.post(
  "/:statusId/issues/create",
  verifyToken,
  upload.array("images", 5),
  addIssueToStatus
)
router.post(
  "/issues/:issueId/images",
  verifyToken,
  upload.array("images", 5),
  updateIssueImages
)
router.delete("/issues/:issueId/images", verifyToken, deleteIssueImage)
router.get("/:statusId/issues", verifyToken, getIssuesByStatus)
router.put("/issues/:issueId/update", verifyToken, updateIssue)
router.get("/issues/:issueId", verifyToken, getIssueById)
router.post("/:issueId/issues/comments/create", verifyToken, createComment)
router.get("/:issueId/issues/comments", verifyToken, getCommentsByIssue)
router.delete("/issues/:issueId", verifyToken, deleteIssue)

// LiveKit token endpoint
router.get("/issues/livekit/token", verifyToken, getLiveKitToken)

export default router
