import bcryptjs from "bcryptjs"
import { Response, Request } from "express"
import crypto from "crypto"

import { User } from "../../models/user-model"
import {
  IForgotPasswordRequestBody,
  ILoginRequestBody,
  IResetPasswordRequestBody,
  IResetPasswordRequestParams,
  ISignUpRequestBody,
  IVerifyEmailRequestBody,
} from "./type"
import {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../../nodemailer/emails"
import { generateToken } from "../../utils/generate-token"

export const signup = async (
  req: Request<{}, {}, ISignUpRequestBody>,
  res: Response
) => {
  const { email, password, name } = req.body

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    })

    await user.save()

    // jwt
    // generateTokenAndSetCookie(res, user._id)

    await sendVerificationEmail({
      email: user.email,
      verificationCode: verificationToken,
    })

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        ...(user as any)._doc,
        password: undefined,
      },
    })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (
  req: Request<{}, {}, IVerifyEmailRequestBody>,
  res: Response
) => {
  const { verificationCode } = req.body

  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    console.log("User found:", user)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined

    await user?.save()

    await sendWelcomeEmail({ email: user?.email, name: user?.name })
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...(user as any)._doc,
        password: undefined,
      },
    })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const login = async (
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response
) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" })
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" })
    }

    user.lastLogin = new Date()
    await user.save()

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...(user as any)._doc,
        password: undefined,
      },
      token: generateToken({ userId: user._id }),
    })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const forgotPassword = async (
  req: Request<{}, {}, IForgotPasswordRequestBody>,
  res: Response
) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" })
  }

  //generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex")
  const resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

  user.resetPasswordToken = resetToken
  user.resetPasswordExpiresAt = resetTokenExpiresAt

  await user.save()

  await sendResetPasswordEmail({
    email: user.email,
    resetToken: `${process.env.CLIENT_URL}/${process.env.RESET_PASSWORD_URL}/${resetToken}`,
  })

  res.status(200).json({ success: true, message: "Password reset email sent" })

  try {
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const resetPassword = async (
  req: Request<IResetPasswordRequestParams, {}, IResetPasswordRequestBody>,
  res: Response
) => {
  const { password, confirmPassword } = req.body
  const { token } = req.params
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" })
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10)
    user.password = hashedPassword
    user.resetPasswordToken = undefined

    await user.save()

    await sendResetSuccessEmail({ email: user.email })

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}
