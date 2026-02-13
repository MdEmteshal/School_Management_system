import express from "express"
import { ConnectDb } from "./config/connectDb.js"
import cookieparser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import carouselRouter from "./routes/carouselRoute.js"
import principalImageRouter from "./routes/principalImageRoute.js"
import studentTopperRouter from "./routes/studentTopperRoute.js"
import eventsRouter from "./routes/eventsRoute.js"
import facultyRouter from "./routes/facultyRoute.js"
import galleryRouter from "./routes/galleryRoute.js"
import authRouter from "./routes/authRoute.js"
import admissionRouter from "./routes/admissionEnqueryRoute.js"

const app = express()
const PORT = process.env.PORT
app.use(helmet())





app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "https://abcschool.onrender.com",
    credentials: true
}))


app.use("/admin", carouselRouter)
app.use("/admin/principal", principalImageRouter)
app.use("/admin/studenttopper", studentTopperRouter)
app.use("/admin/events", eventsRouter)
app.use("/admin/faculty", facultyRouter)
app.use("/admin/gallery", galleryRouter)
app.use("/admin/auth", authRouter)
app.use("/api/admission", admissionRouter)








app.get("/", (req, res) => {
    res.send("Hello how you feels first project you are doing!")
})

app.listen(PORT, (req, res) => {
    console.log("Start server successfully at PORT:3000!")
    ConnectDb()

})
