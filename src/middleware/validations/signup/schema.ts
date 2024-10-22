import { z } from "zod"

// Zod schema
export const signupBodySchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d@$!%*?&\W_]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
  })
  .refine(
    (data) => {
      return data.name && data.email && data.password
    },
    {
      message: "All fields are required",
      path: ["_general"],
    }
  )
