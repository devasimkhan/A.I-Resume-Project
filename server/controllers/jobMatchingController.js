import Resume from "../models/resumeModel.js";
import Job from "../models/jobModel.js";

// Normalize skill names for better matching
const normalizeSkill = (skill) => {
    return skill
        .toLowerCase()
        .trim()
        .replace(/\(es6\+\)/g, "")
        .replace(/\.js/g, "")
        .replace(/5/g, "")
        .replace(/\s+/g, " ");
};


export const matchJobsWithResume = async (req, res, next) => {
    try {
        const { resumeId } = req.params;

        // 1. Find user's resume
        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // 2. Get skills from AI analysis
        const resumeSkills = resume.aiAnalysis?.skills || [];

        if (resumeSkills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No skills found in resume"
            });
        }

        // 3. Get all jobs
        const jobs = await Job.find();

        // 4. Match resume skills with every job
        const matches = jobs.map((job) => {

            const matchedSkills = job.skills.filter((jobSkill) => {

                return resumeSkills.some((resumeSkill) =>
                    normalizeSkill(resumeSkill) === normalizeSkill(jobSkill)
                );

            });

            const missingSkills = job.skills.filter((jobSkill) => {

                return !resumeSkills.some((resumeSkill) =>
                    normalizeSkill(resumeSkill) === normalizeSkill(jobSkill)
                );

            });

            // Calculate match percentage
            const matchScore = Math.round(
                (matchedSkills.length / job.skills.length) * 100
            );

            return {
                jobId: job._id,
                title: job.title,
                company: job.company,
                location: job.location,
                jobType: job.jobType,
                experience: job.experience,
                matchScore,
                matchedSkills,
                missingSkills
            };
        });

        // 5. Highest match score first
        matches.sort((a, b) => b.matchScore - a.matchScore);

        // 6. Send response
        res.status(200).json({
            success: true,
            resumeId,
            matches
        });

    } catch (error) {
        next(error);
    }
};