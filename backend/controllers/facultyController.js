import cloudinary from "../config/cloudinary.js"
import FacultyDB from "../models/facultyModel.js";
export const uploadFacultyImage = async (req, res) => {
  try {
    const { name, experience, specialization, qualification } = req.body

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   folder: `School_Management/Faculty_Image`
      // });

              const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder: `School_Management/Faculty_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const facultyData = await FacultyDB.create({
      imageUrl: uploadedImage,
      name,
      experience,
      specialization,
      qualification,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(facultyData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Faculty Image Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetFacultyImage = async (req, res) => {
  try {
    const result = await FacultyDB.find({})
    if (!result) {
      return res.status(404).json({ message: "Faculty Image data are not found" })

    }
    return res.json(result)
  } catch (error) {
    console.log(error)

  }
}


export const deleteFacultyImage = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await FacultyDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Faculty Image not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await FacultyDB.findByIdAndDelete(id);

    res.json({ message: "Faculty Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};




export const updateFacultyImage = async (req, res) => {
  try {
    const { id, name, experience, specialization, qualification } = req.body


    // 1️⃣ DB se purana record lao
    const image = await FacultyDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: " Faculty Image not found" });
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
      //   folder: `School_Management/Faculty_Image`
      // });

           const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder: `School_Management/Faculty_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;
    image.name = name;
    image.experience = experience;
    image.specialization = specialization;
    image.qualification = qualification;

    await image.save();

    res.json({
      message: "Faculty Image updated successfully",
      data: image
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


