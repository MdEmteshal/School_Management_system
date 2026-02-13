
import nodemailer from 'nodemailer'


const transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_ADMIN_PASSWORD
    }
})

export default transpoter;

