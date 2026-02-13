import mongoose from "mongoose"

const studentTopperListSchema = mongoose.Schema({

    imageUrl: {
        type: String,
        public_id: String
    },
    name: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    marks: {
        type: String,
        required: true
    },
    percentage: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },


}, { timestamps: true })

const StudentTopperListDB = mongoose.model("StudentTopperList", studentTopperListSchema)

export default StudentTopperListDB

