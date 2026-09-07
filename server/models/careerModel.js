import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    education: {
      type: String,
      required: true,
      trim: true,
    },

    background: {
      type: String,
      enum: ["tech", "non-tech"],
      required: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      min: 0,
      default: 0,
    },

    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;