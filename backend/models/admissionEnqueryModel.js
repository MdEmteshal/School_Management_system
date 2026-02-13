import mongoose from "mongoose"

const AdmissionEnquerySchema = mongoose.Schema({
    parentsName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },


}, { timestamps: true })


const AdmissionEnqueryDB = mongoose.model("AdmissionEnquery", AdmissionEnquerySchema)

export default AdmissionEnqueryDB

