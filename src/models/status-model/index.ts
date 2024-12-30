import mongoose from "mongoose"

export interface IStatus extends Document {
  name: string
  project: mongoose.Types.ObjectId
  order: number
}

const statusSchema = new mongoose.Schema<IStatus>({
  name: { type: String, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  order: { type: Number, required: true },
})

const Status = mongoose.model<IStatus>("Status", statusSchema)
export default Status
