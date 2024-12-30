import express from "express"

import { verifyToken } from "../../middleware/verify-token"
import {
  addIssueToStatus,
  getIssuesByStatus,
} from "@/controllers/issue-controller"

const router: any = express.Router()

router.post("/statuses/:statusId/issues", verifyToken, addIssueToStatus)
router.get("/statuses/:statusId/issues", verifyToken, getIssuesByStatus)

export default router
