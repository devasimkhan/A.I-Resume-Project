
import express from "express" 
import protect from "../middleware/authMiddleware.js"
import adminControllers from "../controllers/adminControllers.js"


const router = express.Router()

router.get("/users" , protect.protectForAdmin , adminControllers.getAllUser)
router.get("/credits" , protect.protectForAdmin , adminControllers.getAllCreditsRequests)








export default router