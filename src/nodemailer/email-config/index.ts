import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "salimmustafa763@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
})
