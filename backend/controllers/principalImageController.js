import cloudinary from "../config/cloudinary.js"
import PrincipalDB from "../models/principalModel.js";
export const uploadPrincipalImage = async (req, res) => {
  try {
    const { name, description } = req.body

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   folder: `School_Management/Principal_Image`
      // });

        const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder: `School_Management/Principal_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const principalData = await PrincipalDB.create({
      imageUrl: uploadedImage,
      description,
      name,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(principalData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Principal Image Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetPrincipalImage = async (req, res) => {
  try {
    const result = await PrincipalDB.find({})
    if (!result) {
      return res.status(404).json({ message: "Principal Image data are not found" })

    }
    return res.json(result)
  } catch (error) {
    console.log(error)

  }
}

export const deletePrincipalImage = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await PrincipalDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await PrincipalDB.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};


export const updatePrincipalImage = async (req, res) => {
  try {
    const { id, name, description } = req.body;

    // 1️⃣ DB se purana record lao
    const image = await PrincipalDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 2️⃣ Purani image Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }


    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `School_Management/Principal_Image`
      });
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;
    image.name = name;
    image.description = description;

    await image.save();

    res.json({
      message: "Image updated successfully",
      data: image
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


