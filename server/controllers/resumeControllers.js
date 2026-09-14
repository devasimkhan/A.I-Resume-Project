import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Resume from "../models/resumeModel.js";


const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        const uploadResult = await uploadToCloudinary(req.file.path);

        if (!uploadResult) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed"
            });
        }

        const resume = await Resume.create({
            user: req.user.id,
            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            originalName: req.file.originalname
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resume
        });

    } catch (error) {
        next(error);
    }
};

export default uploadResume;