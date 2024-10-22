import { Request, Response, NextFunction } from "express"
import { verifyEmailSchema } from "./schema"

export const verifyEmailBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyEmailSchema.parse(req.body)
    next()
  } catch (error: any) {
    console.log(error.errors)

    return res.status(400).json({
      success: false,
      message: error.errors.map((err: any) => err.message),
    })
  }
}
