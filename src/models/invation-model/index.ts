import mongoose from "mongoose"

const invitationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    role: { type: String, enum: ["operator", "member"], default: "member" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    inviteCode: { type: String, required: true, unique: true }, // Unique code for invitations
  },
  {
    timestamps: true,
  }
)

const Invitation = mongoose.model("Invitation", invitationSchema)
export default Invitation
