import mongoose from "mongoose"

const gallerySchema = mongoose.Schema({

    imageUrl: {
        type: String,
        public_id: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },


}, { timestamps: true })



const GalleryDB = mongoose.model("Gallery", gallerySchema)

export default GalleryDB

