
import express from "express" 
import protect from "../middleware/authMiddleware.js"
import adminControllers from "../controllers/adminControllers.js"


const router = express.Router()

router.get("/users" , protect.protectForAdmin , adminControllers.getAllUser)
router.get("/career" , protect.protectForAdmin , adminControllers.getCareer)
router.get("/resume" , protect.protectForAdmin , adminControllers.getAllResume)
router.get("/credits" , protect.protectForAdmin , adminControllers.getAllCreditsRequests)
router.put("/credits/:rid" , protect.protectForAdmin , adminControllers.updateCreditRequest)
router.post("/jobs" , protect.protectForAdmin , adminControllers.createJob)
router.get("/jobs" , protect.protectForAdmin , adminControllers.getAllJobs)
router.put("/jobs/:id", protect.protectForAdmin, adminControllers.updateJob);
router.delete("/jobs/:id",protect.protectForAdmin, adminControllers.deleteJob);






export default router