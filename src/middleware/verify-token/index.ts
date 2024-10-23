import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Response, Request } from "express"
import { IUser } from "@/models/user-model"

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}
