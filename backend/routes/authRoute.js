import express from 'express';
import { GetAdminData, Login, Logout, registerAdmin, ResetPasswordWithOtp, SendOtp } from '../controllers/authController.js';
import isAuth from '../middleware/isAuth.js';
const authRouter = express.Router()
authRouter.post("/registration", registerAdmin)
authRouter.post("/login", Login)
authRouter.get("/getadmin", isAuth, GetAdminData)
authRouter.post("/logout", Logout)

authRouter.post("/sendotp", SendOtp)
authRouter.post("/resetpassword", ResetPasswordWithOtp)

export default authRouter
