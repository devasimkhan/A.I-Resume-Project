
import express from "express"
import protect from "../middleware/authMiddleware.js"
import careerControllers from "../controllers/careerControllers.js"

const router =  express.Router() 
router.post("/career" ,  protect.protectForUser,   careerControllers.createCareer)
router.get("/career" ,  protect.protectForUser,   careerControllers.getMyCareer)
router.patch("/career", protect.protectForUser, careerControllers.updateCareer)


export default router