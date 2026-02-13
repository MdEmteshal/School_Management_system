import express from 'express';
import upload from '../middleware/multer.js';
import { deletePrincipalImage, GetPrincipalImage, updatePrincipalImage, uploadPrincipalImage } from '../controllers/principalImageController.js';

const principalImageRouter = express.Router()

principalImageRouter.post("/uploadprincipal", upload.single("image"), uploadPrincipalImage)
principalImageRouter.get("/getprincipal", GetPrincipalImage)
principalImageRouter.post("/deleteprincipal", deletePrincipalImage)
principalImageRouter.post("/updateprincipal", upload.single("image"), updatePrincipalImage)


export default principalImageRouter
