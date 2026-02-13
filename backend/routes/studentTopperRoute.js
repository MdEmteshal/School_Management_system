import express from 'express';
import upload from '../middleware/multer.js';
import { deleteStudentTopperImage, GetStudentTopperImage, updateStudentTopperImage, uploadStudentTopperImage } from '../controllers/studentTopperListController.js';

const studentTopperRouter = express.Router()

studentTopperRouter.post("/uploadstudenttopper", upload.single("image"), uploadStudentTopperImage)
studentTopperRouter.get("/getstudenttopper", GetStudentTopperImage)
studentTopperRouter.post("/deletestudenttopper", deleteStudentTopperImage)
studentTopperRouter.post("/updatestudenttopper", upload.single("image"), updateStudentTopperImage)


export default studentTopperRouter
