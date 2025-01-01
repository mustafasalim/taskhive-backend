import mongoose from "mongoose"

export interface IComment extends Document {
  content: string
  issue: mongoose.Types.ObjectId
  author: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new mongoose.Schema<IComment>({
  content: { type: String, required: true },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Comment = mongoose.model<IComment>("Comment", commentSchema)
export default Comment
