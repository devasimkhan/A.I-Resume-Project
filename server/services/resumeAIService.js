import ai from "../config/gemini.js";

const analyzeResume = async (resumeText, targetRole = "") => {
    const prompt = `
You are an expert resume analyzer and ATS evaluator.

Analyze the following resume.

TARGET ROLE:
${targetRole || "Not specified"}

RESUME:
${resumeText}

Return the analysis in valid JSON format only.

The JSON must contain exactly these fields:

{
    "atsScore": number,
    "skillsMatchScore": number,
    "jobMatchScore": number,
    "resumeQualityScore": number,
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "missingKeywords": [],
    "suggestions": []
}

Rules:

1. atsScore:
Evaluate ATS compatibility of the resume.
Score between 0 and 100.

2. skillsMatchScore:
Evaluate how well the candidate's skills match the TARGET ROLE.
Score between 0 and 100.

3. jobMatchScore:
Evaluate how suitable this resume is for the TARGET ROLE based on:
- skills
- education
- experience
- responsibilities

Score between 0 and 100.

4. resumeQualityScore:
Evaluate overall resume quality including:
- structure
- clarity
- achievements
- experience descriptions
- consistency
- readability
- professional presentation

Score between 0 and 100.

5. skills:
Return the important skills found in the resume.

6. strengths:
Return important strengths.

7. weaknesses:
Return important weaknesses.

8. missingKeywords:
Return important keywords missing from the resume for the TARGET ROLE.

9. suggestions:
Return actionable suggestions to improve the resume.

All scores must be between 0 and 100.

Do not include markdown.
Do not include extra text.
Return valid JSON only.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    const result = JSON.parse(response.text);

    return result;
};

export default analyzeResume;