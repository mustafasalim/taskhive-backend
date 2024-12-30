import mongoose from "mongoose"

export interface IIssue extends Document {
  title: string
  description?: string
  project: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  status: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const issueSchema = new mongoose.Schema<IIssue>({
  title: { type: String, required: true },
  description: { type: String },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Issue = mongoose.model<IIssue>("Issue", issueSchema)
export default Issue
