import uploadToCloudinary, { cloudinary } from "../middleware/cloudinaryMiddleware.js";
import Resume from "../models/resumeModel.js";
import User from "../models/userModel.js";
import { PDFParse } from "pdf-parse";
import { readFile } from "node:fs/promises";
import analyzeResume from "../services/resumeAIService.js";
import Career from "../models/careerModel.js";



const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        // 1. Read PDF from local storage
        const pdfBuffer = await readFile(req.file.path);

        // 2. Extract text from PDF
        const parser = new PDFParse({
            data: pdfBuffer
        });

        const result = await parser.getText();

        await parser.destroy();

        const extractedText = result.text;

        // 3. Check user credits
        const user = await User.findOne({
            _id: req.user.id,
            credits: { $gt: 0 }
        });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Insufficient credits"
            });
        }

        // 4. Get user's career profile
        const career = await Career.findOne({
            user: req.user.id
        });

        const targetRole = career?.targetRole || "";

        // 5. Analyze resume using Gemini
        const aiResult = await analyzeResume(
            extractedText,
            targetRole
        );

        // 6. Calculate Overall Score
        const overallScore = Math.round(
            (aiResult.atsScore * 0.30) +
            (aiResult.skillsMatchScore * 0.30) +
            (aiResult.jobMatchScore * 0.20) +
            (aiResult.resumeQualityScore * 0.20)
        );

        // 7. Upload PDF to Cloudinary
        const uploadResult = await uploadToCloudinary(req.file.path);

        if (!uploadResult) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed"
            });
        }

        // 8. Save resume + AI analysis in MongoDB
        const resume = await Resume.create({
            user: req.user.id,

            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            originalName: req.file.originalname,

            extractedText: extractedText,

            atsScore: aiResult.atsScore,
            skillsMatchScore: aiResult.skillsMatchScore,
            jobMatchScore: aiResult.jobMatchScore,
            resumeQualityScore: aiResult.resumeQualityScore,
            overallScore: overallScore,

            aiAnalysis: {
                skills: aiResult.skills,
                strengths: aiResult.strengths,
                weaknesses: aiResult.weaknesses,
                missingKeywords: aiResult.missingKeywords,
                suggestions: aiResult.suggestions
            }
        });

        // 9. Deduct 1 credit
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: req.user.id,
                credits: { $gt: 0 }
            },
            {
                $inc: { credits: -1 }
            },
            {
                new: true
            }
        );

        // 10. Response
        res.status(201).json({
            success: true,
            message: "Resume uploaded and analyzed successfully",

            creditsRemaining: updatedUser.credits,

            scores: {
                atsScore: aiResult.atsScore,
                skillsMatchScore: aiResult.skillsMatchScore,
                jobMatchScore: aiResult.jobMatchScore,
                resumeQualityScore: aiResult.resumeQualityScore,
                overallScore: overallScore
            },

            resume
        });

    } catch (error) {
        next(error);
    }
};


export const getResumeCount = async (req, res, next) => {
    try {
        const resumeCount = await Resume.countDocuments({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            resumeCount
        });

    } catch (error) {
        next(error);
    }
};

export const getAllResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: resumes.length,
            resumes
        });

    } catch (error) {
        next(error);
    }
};
export const getResumeById = async (req, res, next) => {
    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {
        next(error);
    }
};
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id: id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    // Cloudinary file delete
    if (resume.publicId) {
      await cloudinary.uploader.destroy(resume.publicId, {
        resource_type: "raw"
      });
    }

    // Database se delete
    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      message: "Resume deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message
    });
  }
};
export const getBestResumes = async (req, res, next) => {
    try {
        const bestResumes = await Resume.find({
            user: req.user.id
        })
            .sort({ overallScore: -1 })
            .limit(2);

        res.status(200).json({
            success: true,
            count: bestResumes.length,
            resumes: bestResumes
        });

    } catch (error) {
        next(error);
    }
};

export default uploadResume;