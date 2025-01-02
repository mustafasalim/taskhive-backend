import express from "express"
import {
  createWorkspace,
  deleteWorkspace,
  getActiveWorkspace,
  getUserWorkspaces,
  leaveWorkspace,
  getWorkspaceMembers,
  updateMemberRole,
} from "../../controllers/workspace-controller"
import { verifyToken } from "../../middleware/verify-token"

const router: any = express.Router()

router.post("/create", verifyToken, createWorkspace)
router.get("/", verifyToken, getUserWorkspaces)
router.get("/:workspaceId", verifyToken, getActiveWorkspace)
router.get("/members/:workspaceId", verifyToken, getWorkspaceMembers)
router.delete("/:workspaceId", verifyToken, deleteWorkspace)
router.delete("/leave/:workspaceId", verifyToken, leaveWorkspace)
router.patch(
  "/:workspaceId/members/:memberId/role",
  verifyToken,
  updateMemberRole
)

export default router
