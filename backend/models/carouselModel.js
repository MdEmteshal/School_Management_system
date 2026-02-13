import mongoose from "mongoose"

const carouselSchema = mongoose.Schema({

    imageUrl: {
        type: String,
        public_id: String
    },

}, { timestamps: true })

const Carousel = mongoose.model("Carousel", carouselSchema)

export default Carousel

