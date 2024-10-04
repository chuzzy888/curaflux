import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Hospital",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  hasApplied: {
    type: Boolean,
    default: false,
  },
});

export const Application = mongoose.model("Application", ApplicationSchema);
