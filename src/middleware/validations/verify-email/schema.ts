import { z } from "zod"

// Verify email schema
export const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .length(6, {
      message: "Verification code must be exactly 6 characters long",
    })
    .regex(/^\d{6}$/, {
      message: "Verification code must contain only digits",
    }),
})
