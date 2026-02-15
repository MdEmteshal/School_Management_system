import cloudinary from "../config/cloudinary.js"
import StudentTopperListDB from "../models/studentTopperListModel.js";

export const uploadStudentTopperImage = async (req, res) => {
  try {
    const { name, studentClass, marks, percentage, year } = req.body

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   folder: `School_Management/StudentTopper_Image`
      // });

      const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder:  `School_Management/StudentTopper_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const studentTopperData = await StudentTopperListDB.create({
      imageUrl: uploadedImage,
      name,
      studentClass,
      marks,
      percentage,
      year,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(studentTopperData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Student Topper Image Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetStudentTopperImage = async (req, res) => {
  try {

    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (currentPage - 1) * limit;


    const result = await StudentTopperListDB.find({})
    if (!result) {
      return res.status(404).json({ message: "student Topper Image data are not found" })

    }
    const total = await StudentTopperListDB.countDocuments();
    const limitedDataFectch = await StudentTopperListDB.find().skip(skip).limit(limit);

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


export const deleteStudentTopperImage = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await StudentTopperListDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: " Student TopperImage not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await StudentTopperListDB.findByIdAndDelete(id);

    res.json({ message: " Student Topper Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};




export const updateStudentTopperImage = async (req, res) => {
  try {
    const { id, name, studentClass, marks, percentage, year } = req.body;

    // 1️⃣ DB se purana record lao
    const image = await StudentTopperListDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Student Topper Image not found" });
    }

    // 2️⃣ Purani image Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   folder: `School_Management/StudentTopper_Image`
      // });

      const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder:  `School_Management/StudentTopper_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;
    image.name = name;
    image.studentClass = studentClass;
    image.marks = marks;
    image.percentage = percentage;
    image.year = year;

    await image.save();

    res.json({
      message: " Student Topper Image updated successfully",
      data: image
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


