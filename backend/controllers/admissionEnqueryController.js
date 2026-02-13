import AdmissionEnqueryDB from "../models/admissionEnqueryModel.js";
import ContactUsDB from "../models/contactUsModel.js";


export const admissionEnquery = async (req, res) => {
  try {
    const { parentsName, phone, studentName, studentClass, } = req.body;

    if (!parentsName || !phone || !studentName || !studentClass) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const userExist = await AdmissionEnqueryDB.findOne({ phone });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "phone already registered",
      });
    }

    const user = await AdmissionEnqueryDB.create({
      parentsName,
      phone,
      studentName,
      studentClass,
    });

    res.status(201).json({
      success: true,
      message: "Admission Enquery successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


//get admission enquery student lists


export const GetAdmissionEnqueryLists = async (req, res) => {
  try {

    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (currentPage - 1) * limit;


    const result = await AdmissionEnqueryDB.find({})
    if (!result) {
      return res.status(404).json({ message: "Admission Enquery  data are not found" })

    }

    const total = await AdmissionEnqueryDB.countDocuments();
    const limitedDataFectch = await AdmissionEnqueryDB.find().skip(skip).limit(limit);

    return res.json({
      currentPage,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      limitedDataFectch,
    })

  } catch (error) {
    console.log(error)

  }
}




export const contactUs = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const userExist = await ContactUsDB.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "email already registered",
      });
    }

    const user = await ContactUsDB.create({
      name,
      email,
      msg,
    });

    res.status(201).json({
      success: true,
      message: "ContactUs successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get contactUs Data

export const GetContactUsLists = async (req, res) => {
  try {

    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (currentPage - 1) * limit;


    const result = await ContactUsDB.find({})
    if (!result) {
      return res.status(404).json({ message: "ContactUs  data are not found" })

    }

    const total = await ContactUsDB.countDocuments();
    const limitedDataFectch = await ContactUsDB.find().skip(skip).limit(limit);

    return res.json({
      currentPage,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      limitedDataFectch,
    })

  } catch (error) {
    console.log(error)

  }
}