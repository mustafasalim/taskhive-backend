import express from "express"
import { verifyToken } from "../../middleware/verify-token"
import {
  addMembersToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByWorkspace,
  updateProjectDetails,
} from "../../controllers/project-controller"

const router: any = express.Router()

router.post("/create", verifyToken, createProject)
router.post("/:projectId/members", verifyToken, addMembersToProject)
router.get("/workspace/:workspaceId", verifyToken, getProjectsByWorkspace)
router.get("/workspaces/:projectId", verifyToken, getProjectById)
router.patch("/:projectId/update", verifyToken, updateProjectDetails)
router.delete("/:projectId", verifyToken, deleteProject)
router.post("/:projectId/leave", verifyToken, deleteProject)

export default router
