import mongoose from "mongoose";

const creditsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    credits: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "granted", "rejected"],
      default: "pending",
    },
   processedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
} ,
  },
  {
    timestamps: true,
  }
);

const CreditsRequest = mongoose.model("CreditsRequest", creditsSchema)

export default CreditsRequest