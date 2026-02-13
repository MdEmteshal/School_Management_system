import express from 'express';
import upload from '../middleware/multer.js';
import { deleteEventsImage, GetEventsImage, updateEventsImage, uploadEventsImage } from '../controllers/eventsController.js';

const eventsRouter = express.Router()

eventsRouter.post("/uploadevents", upload.single("image"), uploadEventsImage)
eventsRouter.get("/getevents", GetEventsImage)
eventsRouter.post("/deleteevents", deleteEventsImage)
eventsRouter.post("/updateevents", upload.single("image"), updateEventsImage)


export default eventsRouter
