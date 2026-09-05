

import express from "express"
import authControllers from "../controllers/authControllers.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()


router.post("/register" , authControllers.userRegister)
router.post("/login" ,  authControllers.userLogin)
router.post("/private" , protect.protectForUser ,  authControllers.privateController)

export default router