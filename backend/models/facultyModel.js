import mongoose from "mongoose"

const facultySchema = mongoose.Schema({

    imageUrl: {
        type: String,
        public_id: String
    },
    name: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }, specialization: {
        type: String,
        required: true
    }, qualification: {
        type: String,
        required: true
    },


}, { timestamps: true })



const FacultyDB = mongoose.model("Faculty", facultySchema)

export default FacultyDB

