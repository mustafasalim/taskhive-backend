import { Request, Response, NextFunction } from "express"
import { loginSchema } from "./schema"

export const loginBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body)
    next()
  } catch (error: any) {
    console.log(error.errors)

    return res.status(400).json({
      success: false,
      message: error.errors.map((err: any) => err.message),
    })
  }
}
