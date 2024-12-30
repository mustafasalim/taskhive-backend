import express from "express"

import { verifyToken } from "../../middleware/verify-token"
import {
  addIssueToStatus,
  getIssuesByStatus,
} from "../../controllers/issue-controller"

const router: any = express.Router()

router.post("/:statusId/issues/create", verifyToken, addIssueToStatus)
router.get("/:statusId/issues", verifyToken, getIssuesByStatus)

export default router
