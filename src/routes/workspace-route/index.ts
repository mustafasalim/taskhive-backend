import express from "express"
import {
  createWorkspace,
  getUserWorkspaces,
} from "../../controllers/workspace-controller"
import { verifyToken } from "../../middleware/verify-token"

const router: any = express.Router()

// Register the route handlers
router.post("/create-workspace", verifyToken, createWorkspace)
router.get("/get-workspaces", verifyToken, getUserWorkspaces)

export default router
