import { Types } from "mongoose"

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId
      email: string
      name: string
    }
  }
}
