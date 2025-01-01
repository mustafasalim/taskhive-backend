import mongoose, { Document } from "mongoose"

export interface IUser extends Document {
  userId: string
  name: string
  email: string
  password: string
  lastLogin: Date
  isVerified: boolean
  resetPasswordToken?: string
  resetPasswordExpiresAt?: Date
  verificationToken?: string
  verificationTokenExpiresAt?: Date
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
