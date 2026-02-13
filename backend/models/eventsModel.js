import mongoose from "mongoose"

const eventsSchema = mongoose.Schema({

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



const EventsDB = mongoose.model("EventsImage", eventsSchema)

export default EventsDB

