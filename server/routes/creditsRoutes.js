import express from "express"
import protect from "../middleware/authMiddleware.js"
import creditsControllers from "../controllers/creditsControllers.js"


const router = express.Router()


router.post("/credit" , protect.protectForUser , creditsControllers.creditsRequest)




export default router