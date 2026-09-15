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

        console.log(result);

    } catch (error) {
        console.error(error);
    }
};

test();