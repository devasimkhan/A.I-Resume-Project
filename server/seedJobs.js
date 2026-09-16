
import "dotenv/config";
import mongoose from "mongoose";
import Job from "./models/jobModel.js";

const jobs = [
    {
        title: "MERN Stack Developer",
        company: "Tech Solutions",
        location: "Indore",
        jobType: "Full Time",
        experience: 1,
        skills: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JavaScript",
            "REST API"
        ],
        description:
            "Looking for a MERN Stack Developer to build scalable web applications."
    },

    {
        title: "Frontend Developer",
        company: "Digital Labs",
        location: "Remote",
        jobType: "Remote",
        experience: 1,
        skills: [
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Redux"
        ],
        description:
            "Looking for a Frontend Developer with strong React and JavaScript skills."
    },

    {
        title: "Backend Node.js Developer",
        company: "CodeWorks",
        location: "Bangalore",
        jobType: "Full Time",
        experience: 2,
        skills: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST API",
            "JWT",
            "JavaScript"
        ],
        description:
            "Looking for a backend developer to build APIs using Node.js and Express."
    },

    {
        title: "Software Developer Intern",
        company: "InnovateTech",
        location: "Indore",
        jobType: "Internship",
        experience: 0,
        skills: [
            "JavaScript",
            "React",
            "Node.js",
            "Git",
            "HTML",
            "CSS"
        ],
        description:
            "Internship opportunity for developers interested in modern web technologies."
    },

    {
        title: "Full Stack Developer",
        company: "NextGen Systems",
        location: "Pune",
        jobType: "Full Time",
        experience: 2,
        skills: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "TypeScript",
            "Git"
        ],
        description:
            "Looking for a Full Stack Developer to work on modern web applications."
    }
];

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Job.deleteMany();

        await Job.insertMany(jobs);

        console.log("Dummy jobs inserted successfully");

        await mongoose.disconnect();

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

seedJobs();