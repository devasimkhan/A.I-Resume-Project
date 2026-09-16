import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
    },

    originalName: {
      type: String,
    },

    extractedText: {
      type: String,
    },

    // AI Scores
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    skillsMatchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    jobMatchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    resumeQualityScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    // AI Analysis
    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;