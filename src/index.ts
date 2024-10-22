import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db/connect-db"

import authRoutes from "./routes/auth-route"
import { setupSwagger } from "./swagger"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json()) // allows us to parse incoming requests:req.body

setupSwagger({ app }) //swagger install

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log("Server is running on port: ", PORT)
})
