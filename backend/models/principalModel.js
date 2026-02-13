import mongoose from "mongoose"

const principalImageSchema = mongoose.Schema({

    imageUrl: {
        type: String,
        public_id: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },


}, { timestamps: true })



const PrincipalDB = mongoose.model("PrincipalImage", principalImageSchema)

export default PrincipalDB

