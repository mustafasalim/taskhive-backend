import express from "express"
import {
  createWorkspace,
  deleteWorkspace,
  getActiveWorkspace,
  getUserWorkspaces,
} from "../../controllers/workspace-controller"
import { verifyToken } from "../../middleware/verify-token"

const router: any = express.Router()

router.post("/create", verifyToken, createWorkspace)
router.get("/", verifyToken, getUserWorkspaces)
router.delete("/:workspaceId", verifyToken, deleteWorkspace)
router.get("/:workspaceId", verifyToken, getActiveWorkspace)

export default router
