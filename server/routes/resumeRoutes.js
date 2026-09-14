import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import uploadResume from "../controllers/resumeControllers.js";

const router = express.Router();

router.post(
    "/resume/upload",
    protect.protectForUser,
    upload.single("resume"),
    uploadResume
);

export default router;