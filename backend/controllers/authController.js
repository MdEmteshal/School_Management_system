import { genrateToken } from "../config/token.js";
import UserDB from "../models/userModel.js";
import transpoter from "../utils/mail.js";
import bcrypt from "bcryptjs"


export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const userExist = await UserDB.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await UserDB.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not Exists" })
    }

    const matchpass = await bcrypt.compare(password, user.password)
    if (!matchpass) {
      return res.status(400).json({ message: "Please enter correct password" })
    }
    console.log("JWT SECRET in login:", process.env.JWT_SECRET_KEY);
    let token = genrateToken(user._id)
    console.log("Login token", token)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({ message: `Login Error ${error}` })
  }
}



export const GetAdminData = async (req, res) => {
  try {
    const userId = req.userId
    console.log("userId:===", userId)
    const user = await UserDB.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `GetUserData error ${error}` })

  }

}


export const Logout = async (req, res) => {
  try {


    await res.clearCookie("token");

    return res.status(200).json({ message: "Logout succesfully" })

  } catch (error) {
    return res.status(500).json({ message: `Logout Error ${error}` })

  }
}

// forgot password

export const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await UserDB.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });
    if (user.emailVerified !== true) {
      return res.status(404).json({ message: "Email not varified" });

    }


    const otp = String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0');

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();


    const subject = "Your OTP for Password Reset"
    const message = `Your OTP is: <b>${otp}</b>. It is valid for 5 minutes.`

    const info = await transpoter.sendMail({
      from: "'Hello'<mdemteshal786@gmail.com>",
      to: email,
      subject: subject,
      html: message,
    })


    return res.status(200).json({  message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};


export const ResetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;


    const user = await UserDB.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (String(user.otp).trim() !== String(otp).trim())
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Please Enter strong Password" })
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({ user, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
};







