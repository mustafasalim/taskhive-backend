import express from "express"
import { verifyToken } from "../../middleware/verify-token"
import {
  addMembersToProject,
  createProject,
  getProjectById,
  getProjectsByWorkspace,
} from "../../controllers/project-controller"

const router: any = express.Router()

router.post("/create", verifyToken, createProject)
router.post("/:projectId/members", verifyToken, addMembersToProject)
router.get("/workspace/:workspaceId", verifyToken, getProjectsByWorkspace)
router.get("/workspaces/:projectId", verifyToken, getProjectById)

export default router
