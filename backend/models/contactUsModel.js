import mongoose from "mongoose"

const ContactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    msg: {
        type: String,
        required: true
    },
}, { timestamps: true })


const ContactUsDB = mongoose.model("ContactUs", ContactUsSchema)

export default ContactUsDB

