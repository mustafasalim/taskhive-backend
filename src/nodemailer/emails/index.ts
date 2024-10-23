import dotenv from "dotenv"
import { transporter } from "../email-config"
import {
  inviteWorkspaceEmailTemplate,
  passwordResetRequestTemplate,
  passwordResetSuccessEmailTemplate,
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from "../email-template"
import {
  ISendInviteWorkspaceEmail,
  ISendPasswordResetEmail,
  ISendResetSuccessEmail,
  ISendVerificaionEmail,
  ISendWelcomeEmail,
} from "./type"

dotenv.config()

export const sendVerificationEmail = async (props: ISendVerificaionEmail) => {
  const { email, verificationCode } = props
  try {
    const info = await transporter.sendMail({
      from: "salimmustafa763@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Email verification ✔", // Subject line
      html: verificationEmailTemplate({ verificationCode }), // html body
    })
    console.log("Verification email sent succesfuly", info)

    return info
  } catch (error: any) {
    console.log("Verification email code error")
    throw new Error(error)
  }
}

export const sendWelcomeEmail = async (props: ISendWelcomeEmail) => {
  const { email, name } = props

  try {
    const info = await transporter.sendMail({
      from: "salimmustafa763@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Welcome ✔ ${name}`, // Subject line
      html: welcomeEmailTemplate({ appName: "Auth app", name }), // html body
    })
    console.log("Welcome email sent successfully", info)
    return info
  } catch (error: any) {
    throw new Error(error)
  }
}

export const sendResetPasswordEmail = async (
  props: ISendPasswordResetEmail
) => {
  const { email, resetToken } = props

  try {
    const info = await transporter.sendMail({
      from: "salimmustafa763@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Reset Password ✔ ${email}`, // Subject line
      html: passwordResetRequestTemplate({ resetToken }), // html body
    })
    console.log("Reset password email sent successfully", info)
    return info
  } catch (error: any) {
    throw new Error(error)
  }
}

export const sendResetSuccessEmail = async (props: ISendResetSuccessEmail) => {
  const { email } = props

  try {
    const info = await transporter.sendMail({
      from: "salimmustafa763@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Reset Password Success ✔ ${email}`, // Subject line
      html: passwordResetSuccessEmailTemplate(), // html body
    })
    console.log("Reset success password email sent successfully", info)
    return info
  } catch (error: any) {
    throw new Error(error)
  }
}

export const sendWorkspaceInviteCodeEmail = async (
  props: ISendInviteWorkspaceEmail
) => {
  const { inviteCode, email } = props
  try {
    const info = await transporter.sendMail({
      from: "salimmustafa763@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Invite Code ✔", // Subject line
      html: inviteWorkspaceEmailTemplate({ inviteCode }), // html body
    })
    console.log("Verification email sent succesfuly", info)

    return info
  } catch (error: any) {
    console.log("Verification email code error")
    throw new Error(error)
  }
}
