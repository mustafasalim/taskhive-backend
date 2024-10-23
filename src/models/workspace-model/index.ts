import mongoose from "mongoose"

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: ["admin", "operator", "member"],
    default: "member",
  },
})

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
)

const Workspace = mongoose.model("Workspace", workspaceSchema)
export default Workspace
