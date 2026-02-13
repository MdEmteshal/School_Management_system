import cloudinary from "../config/cloudinary.js"
import EventsDB from "../models/eventsModel.js";
export const uploadEventsImage = async (req, res) => {
  try {
    const { title, description } = req.body

    // Upload image to Cloudinary
    let uploadedImage = null;
    let public_id = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `School_Management/Events_Image`
      });
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    const eventsData = await EventsDB.create({
      imageUrl: uploadedImage,
      title,
      description,
      public_id
    })

    console.log("cloudinary:", cloudinary);
    console.log("uploader:", cloudinary.uploader);


    return res.status(201).json(eventsData)
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Events Image Uploaded" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}


export const GetEventsImage = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;


    const result = await EventsDB.find({})
    if (!result) {
      return res.status(404).json({ message: "Events Image data are not found" })

    }

    const total = await EventsDB.countDocuments();
    const limitedDataFectch = await EventsDB.find().skip(skip).limit(limit);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      limitedDataFectch,
    })

  } catch (error) {
    console.log(error)

  }
}

export const deleteEventsImage = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ DB se data lao
    const image = await EventsDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Events Image not found" });
    }

    // 2️⃣ Cloudinary se delete
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // 3️⃣ MongoDB se delete
    await EventsDB.findByIdAndDelete(id);

    res.json({ message: " Events Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};




export const updateEventsImage = async (req, res) => {
  try {
    const { id, title, description } = req.body;

    // 1️⃣ DB se purana record lao
    const image = await EventsDB.findById(id);
    if (!image) {
      return res.status(404).json({ message: " Events Image not found" });
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
        folder: `School_Management/Events_Image`
      });
      uploadedImage = result.secure_url; // URL mil gaya
      public_id = result.public_id
    }

    // 4️⃣ MongoDB me update
    image.imageUrl = uploadedImage;
    image.public_id = public_id;
    image.description = description;
    image.title = title

    await image.save();

    res.json({
      message: "Events Image updated successfully",
      data: image
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

