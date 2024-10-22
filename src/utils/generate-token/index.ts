import jwt from "jsonwebtoken"
import { IGenerateToken } from "./type"

export const generateToken = (props: IGenerateToken) => {
  const { userId } = props
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  })

  return token
}
