import express from 'express';
import upload from '../middleware/multer.js';
import { deleteCarousel, GetCarouselImage, updateCarousel, uploadCarousel } from "../controllers/carouselUploadController.js"
const carouselRouter = express.Router()

carouselRouter.post("/uploadcarousel", upload.single("image"), uploadCarousel)
carouselRouter.get("/getcarousel", GetCarouselImage)
carouselRouter.post("/deletecarousel", deleteCarousel)
carouselRouter.post("/updatecarousel", upload.single("image"), updateCarousel)


export default carouselRouter
