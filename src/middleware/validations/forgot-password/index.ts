import { Request, Response, NextFunction } from "express"
import { forgotPasswordSchema } from "./schema"

export const forgotPasswordBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    forgotPasswordSchema.parse(req.body)
    next()
  } catch (error: any) {
    console.log(error.errors)

    return res.status(400).json({
      success: false,
      message: error.errors.map((err: any) => err.message),
    })
  }
}
