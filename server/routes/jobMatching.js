import express from "express"
import protect from "../middleware/authMiddleware.js"
import { matchJobsWithResume } from "../controllers/jobMatchingController.js"

const router = express.Router()
 
router.get("/jobs/match/:resumeId" , protect.protectForUser , matchJobsWithResume)


export default router