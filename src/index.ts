import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db/connect-db"

import authRoutes from "./routes/auth-route"
import workspaceRoutes from "./routes/workspace-route"
import invitationRoutes from "./routes/invitation-route"
import { setupSwagger } from "./swagger"
import { IUser } from "./models/user-model"

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json()) // allows us to parse incoming requests:req.body

setupSwagger({ app }) //swagger install

app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workspaceRoutes)
app.use("/api/invitation", invitationRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log("Server is running on port: ", PORT)
})
