import express from "express"
import {
  createWorkspace,
  deleteWorkspace,
  getActiveWorkspace,
  getUserWorkspaces,
  leaveWorkspace,
} from "../../controllers/workspace-controller"
import { verifyToken } from "../../middleware/verify-token"

const router: any = express.Router()

router.post("/create", verifyToken, createWorkspace)
router.get("/", verifyToken, getUserWorkspaces)
router.delete("/:workspaceId", verifyToken, deleteWorkspace)
router.get("/:workspaceId", verifyToken, getActiveWorkspace)
router.delete("/leave/:workspaceId", verifyToken, leaveWorkspace)

export default router
