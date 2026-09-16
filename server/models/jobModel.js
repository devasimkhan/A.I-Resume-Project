import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            enum: ["Full Time", "Part Time", "Internship", "Remote"],
            required: true
        },

        experience: {
            type: Number,
            required: true,
            min: 0
        },

        skills: {
            type: [String],
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;