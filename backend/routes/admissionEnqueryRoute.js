import express from 'express';

import { admissionEnquery, contactUs, GetAdmissionEnqueryLists, GetContactUsLists } from '../controllers/admissionEnqueryController.js';
const admissionRouter = express.Router()
admissionRouter.post("/admissionenquery", admissionEnquery)
admissionRouter.get("/getadmissionenquery", GetAdmissionEnqueryLists)

admissionRouter.post("/contactus", contactUs)
admissionRouter.get("/getcontactus", GetContactUsLists)







export default admissionRouter
