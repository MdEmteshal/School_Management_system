import cloudinary from "../config/cloudinary.js"
import Carousel from "../models/carouselModel.js";
export const uploadCarousel = async (req, res) => {
  try {

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `School_Management/Carousel`
      });
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const carouselData = await Carousel.create({
      imageUrl: uploadedImage,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(carouselData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Carousel Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetCarouselImage = async (req, res) => {
  try {
    const result = await Carousel.find({})
    if (!result) {
      return res.status(404).json({ message: "Carousel data are not found" })

    }
    return res.json(result)
  } catch (error) {
    console.log(error)

  }
}


export const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await Carousel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await Carousel.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};


export const updateCarousel = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se purana record lao
    const image = await Carousel.findById(id);
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
        folder: `School_Management/Carousel`
      });
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;

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

