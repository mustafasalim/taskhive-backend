import express from "express"
import { verifyToken } from "../../middleware/verify-token"
import {
  createProject,
  getProjectById,
  getProjectsByWorkspace,
} from "../../controllers/project-controller"

const router: any = express.Router()

router.post("/create", verifyToken, createProject)
router.get("/workspace/:workspaceId", verifyToken, getProjectsByWorkspace)
router.get("/workspaces/:projectId", verifyToken, getProjectById)

export default router
