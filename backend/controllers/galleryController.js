import cloudinary from "../config/cloudinary.js"
import GalleryDB from "../models/galleryModel.js"
export const uploadGalleryImage = async (req, res) => {
  try {
    const { title, description } = req.body

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   folder: `School_Management/Gallery_Image`
      // });

           const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder: `School_Management/Gallery_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const galleryData = await GalleryDB.create({
      imageUrl: uploadedImage,
      title,
      description,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(galleryData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Gallery Image Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetGalleryImage = async (req, res) => {
  try {

    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (currentPage - 1) * limit;


    const result = await GalleryDB.find({})
    if (!result) {
      return res.status(404).json({ message: "Gallery Image data are not found" })

    }
    const total = await GalleryDB.countDocuments();
    const limitedDataFectch = await GalleryDB.find().skip(skip).limit(limit);

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

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await GalleryDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Gallery Image not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await GalleryDB.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};




export const updateGalleryImage = async (req, res) => {
  try {
    const { id, title, description } = req.body;

    // 1️⃣ DB se purana record lao
    const image = await GalleryDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Gallery Image not found" });
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
      //   folder: `School_Management/Gallery_Image`
      // });

      const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
       folder: `School_Management/Gallery_Image`,
      }
    );
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;
    image.title = title;
    image.description = description;

    await image.save();

    res.json({
      message: "Gallery Image updated successfully",
      data: image
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


