import express from "express"
import { verifyToken } from "../../middleware/verify-token"
import {
  inviteUser,
  joinWorkspaceWithCode,
} from "../../controllers/invation-controller"

const router: any = express.Router()

router.post("/invite-user", verifyToken, inviteUser)
router.post("/join-workspace", verifyToken, joinWorkspaceWithCode)

export default router
