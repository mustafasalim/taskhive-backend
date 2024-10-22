import express from "express"
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../../controllers/auth-controller/index"
import { signupBodyValidaton } from "../../middleware/validations/signup"
import { loginBodyValidation } from "../../middleware/validations/login"
import { resetPasswordBodyValidation } from "../../middleware/validations/reset-password"
import { forgotPasswordBodyValidation } from "../../middleware/validations/forgot-password"
import { verifyEmailBodyValidation } from "../../middleware/validations/verify-email"

const router: any = express.Router()

// Register the route handlers
router.post("/signup", signupBodyValidaton, signup)
router.post("/login", loginBodyValidation, login)

router.post("/verify-email", verifyEmailBodyValidation, verifyEmail)
router.post("/forgot-password", forgotPasswordBodyValidation, forgotPassword)
router.post(
  "/reset-password/:token",
  resetPasswordBodyValidation,
  resetPassword
)

export default router
