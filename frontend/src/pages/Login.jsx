import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAdminData } from "../redux/adminSlice";
import { HiArrowLeft } from "react-icons/hi";   // 👈 add this

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        backendUrl + "/admin/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message);
      console.log("Logged in user:", res.data);
      dispatch(setAdminData(res.data));
      navigate("/change-settings");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      dispatch(setAdminData(null));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 relative">



      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >


        <h2 className="relative text-2xl font-bold text-orange-600 mb-4 text-center">

          {/* Back Arrow */}
          <HiArrowLeft
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer hover:text-orange-800"
            onClick={() => navigate(-1)}
          />

          Admin Login
        </h2>



        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Login
        </button>
        {/* 👇 Forgot Password */}
        <p
          onClick={() => navigate("/send-otp")}
          className="text-right text-sm text-orange-600 mt-3 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

        {message && (
          <p className="text-center text-sm mt-3 text-red-500">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

