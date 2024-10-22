import { NextFunction, Request, Response } from "express"
import { resetPasswordSchema } from "./schema"
import { z } from "zod"

export const resetPasswordBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    resetPasswordSchema.parse(req.body)
    next()
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }))

      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      })
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" })
  }
}
