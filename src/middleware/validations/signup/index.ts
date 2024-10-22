import { NextFunction, Request, Response } from "express"
import { signupBodySchema } from "./schema"

export const signupBodyValidaton = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupBodySchema.parse(req.body)
    next()
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors.map((err: any) => err.message),
    })
  }
}
