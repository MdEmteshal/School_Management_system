import express from 'express';
import upload from '../middleware/multer.js';
import { deleteGalleryImage, GetGalleryImage, updateGalleryImage, uploadGalleryImage } from '../controllers/galleryController.js';

const galleryRouter = express.Router()

galleryRouter.post("/uploadgallery", upload.single("image"), uploadGalleryImage)
galleryRouter.get("/getgallery", GetGalleryImage)
galleryRouter.post("/deletegallery", deleteGalleryImage)
galleryRouter.post("/updategallery", upload.single("image"), updateGalleryImage)


export default galleryRouter
