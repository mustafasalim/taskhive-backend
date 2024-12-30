import express from "express"

import { verifyToken } from "../../middleware/verify-token"
import {
  createStatus,
  deleteStatus,
  getStatusesByProject,
  updateStatus,
} from "../../controllers/status-controller"

const router: any = express.Router()

router.post("/:projectId/create", verifyToken, createStatus)
router.get("/:projectId", verifyToken, getStatusesByProject)
router.patch("/:statusId", verifyToken, updateStatus)
router.delete("/:statusId", verifyToken, deleteStatus)

export default router
