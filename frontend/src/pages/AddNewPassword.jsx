import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { backendUrl } from "../App";

export const AddNewPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {

    try {
      const res = await axios.post(backendUrl + "/admin/auth/resetpassword", {
        email,
        otp: otp.toString(),
        newPassword: password,
      }, { withCredentials: true });

      setMsg(res.data.message);
      navigate("/events")
    } catch (error) {
      console.log("forgot new password error", error)
    }

  };

  return (
    <div className="flex justify-center mt-20">
      <form className="p-6 bg-white rounded shadow w-80" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-xl font-bold mb-3">Reset Password with OTP</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded" onClick={handleReset}>
          Reset Password
        </button>

        {msg && <p className="text-green-600 mt-3">{msg}</p>}
      </form>
    </div>
  );
};


