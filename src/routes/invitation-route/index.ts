import express from "express"
import { verifyToken } from "../../middleware/verify-token"
import {
  inviteUser,
  joinWorkspaceWithCode,
} from "../../controllers/invation-controller"

const router: any = express.Router()
router.post("/invite-user", verifyToken, inviteUser) // Route to invite a user to a workspace
router.post("/join", verifyToken, joinWorkspaceWithCode) // Route to join a workspace using an invite code

export default router
