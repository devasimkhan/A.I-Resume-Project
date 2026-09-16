import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";
import uploadResume, { deleteResume, getAllResumes, getBestResumes, getResumeById, getResumeCount } from "../controllers/resumeControllers.js";

const router = express.Router();

router.post(
    "/resume/upload",
    protect.protectForUser,
    upload.single("resume"),
    uploadResume
);

router.get("/resume/count"  , protect.protectForUser , getResumeCount)
router.delete(
  "/resume/:id",
  protect.protectForUser,
  deleteResume
);
router.get(
    "/resume/best",
    protect.protectForUser,
    getBestResumes
);

router.get("/resume" ,  protect.protectForUser,  getAllResumes)
router.get("/resume/:id" ,  protect.protectForUser, getResumeById)
export default router;