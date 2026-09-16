import "dotenv/config";
import analyzeResume from "./services/resumeAIService.js";

const test = async () => {
    try {
        const result = await analyzeResume(`
            Asim Khan
            MERN Stack Developer

            Skills:
            React, Node.js, Express.js, MongoDB

            Experience:
            MERN Stack Internship

            Education:
            B.Sc. Mathematics
        `);

        console.log("AI Result:");
        console.log(result);

        const overallScore = Math.round(
            (result.atsScore * 0.30) +
            (result.skillsMatchScore * 0.30) +
            (result.jobMatchScore * 0.20) +
            (result.resumeQualityScore * 0.20)
        );

        console.log("\nOverall Score:", overallScore);

    } catch (error) {
        console.error(error);
    }
};

test();