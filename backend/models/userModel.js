import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: { type: Boolean, default: false },
    otp: {
        type: String
    },
    otpExpires: Date

}, { timestamps: true })


const UserDB = mongoose.model("User", UserSchema)

export default UserDB

