import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db/connect-db"
import path from "path"

import authRoutes from "./routes/auth-route"
import workspaceRoutes from "./routes/workspace-route"
import invitationRoutes from "./routes/invitation-route"
import projectRoutes from "./routes/project-route"
import statusRoutes from "./routes/status-route"
import issueRoute from "./routes/issue-route"
import fileRoute from "./routes/file-route"
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
app.use("/uploads", express.static("uploads")) // Serve uploaded files statically

setupSwagger({ app }) //swagger install

app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workspaceRoutes)
app.use("/api/invitation", invitationRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/statuses", statusRoutes)
app.use("/api/statuses", issueRoute)
app.use("/api", fileRoute)

app.listen(PORT, () => {
  connectDB()
  console.log("Server is running on port: ", PORT)
})
