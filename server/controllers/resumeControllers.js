import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Resume from "../models/resumeModel.js";
import { PDFParse } from "pdf-parse";
import { readFile } from "node:fs/promises";


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

        // 3. Upload PDF to Cloudinary
        const uploadResult = await uploadToCloudinary(req.file.path);

        if (!uploadResult) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed"
            });
        }

        // 4. Save resume + extracted text in MongoDB
        const resume = await Resume.create({
            user: req.user.id,
            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            originalName: req.file.originalname,
            extractedText: extractedText
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded and parsed successfully",
            resume
        });

    } catch (error) {
        next(error);
    }
};

export default uploadResume;