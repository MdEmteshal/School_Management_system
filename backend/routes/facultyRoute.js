import express from 'express';
import upload from '../middleware/multer.js';
import { deleteFacultyImage, GetFacultyImage, updateFacultyImage, uploadFacultyImage } from '../controllers/facultyController.js';

const facultyRouter = express.Router()

facultyRouter.post("/uploadfaculty", upload.single("image"), uploadFacultyImage)
facultyRouter.get("/getfaculty", GetFacultyImage)
facultyRouter.post("/deletefaculty", deleteFacultyImage)
facultyRouter.post("/updatefaculty", upload.single("image"), updateFacultyImage)


export default facultyRouter
