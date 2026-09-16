import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getRecommendedJobs
} from "../controllers/recommendedJobsController.js";

const router = express.Router();

router.get(
    "/jobs/recommended/:resumeId",  protect.protectForUser, getRecommendedJobs
);

export default router;