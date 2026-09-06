import express from "express"
import dotenv from "dotenv"
dotenv.config()
import colors from "colors"
import connectDB from "./config/dbConfig.js"
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import creditsRoutes from "./routes/creditsRoutes.js"


const app = express()

connectDB()

const PORT  = process.env.PORT || 3001


app.use(express.json())
app.use(express.urlencoded())


app.get("/" , (req , res) => {
    res.status(200).json({
        message : " WELCOME TO A-I RESUME API's"
    })
})   
//auth routes
app.use("/api/auth" , authRoutes)
// admin routes
app.use("/api/admin" , adminRoutes)
// credits Routes
app.use("/api/auth" , creditsRoutes)



app.use(errorHandler)
app.listen(PORT , () => {
    console.log(`SERVER RUNNING AT PORT : ${PORT}`.bgBlue)
})








