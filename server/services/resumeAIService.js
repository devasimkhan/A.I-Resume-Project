import ai from "../config/gemini.js";

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert resume analyzer and ATS evaluator.

Analyze the following resume:

${resumeText}

Return the analysis in valid JSON format only.

The JSON must contain:

{
    "atsScore": number,
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "missingKeywords": [],
    "suggestions": []
}

ATS score must be between 0 and 100.
Do not include markdown or extra text.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text;
};

export default analyzeResume;