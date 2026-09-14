import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: "hjs8nuxn",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileLink) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(
            fileLink,
            {
                resource_type: "auto",
                folder: "resumes",
            }
        );

        // Upload successful → local temporary file delete
        fs.unlinkSync(fileLink);

        return uploadResult;

    } catch (error) {
        console.log("Cloudinary upload error:", error);

        // Upload failed → local file delete
        if (fs.existsSync(fileLink)) {
            fs.unlinkSync(fileLink);
        }

        return null;
    }
};

export default uploadToCloudinary;