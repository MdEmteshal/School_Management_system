import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"
import { useNavigate } from "react-router";

export const SendOtpMessage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSendOtp = async (e) => {
     e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/admin/auth/sendotp", {
        email
      }, { withCredentials: true });

     console.log("SEND OTP RESPONSE:", res.data);
    setMsg(res.data.message);

    if (res.data.message === "OTP sent successfully") {
      navigate("/add-new-password");
    }
    } catch (error) {
        console.log("otp error",
                    error?.response?.data?.message
                )
      console.log("forgot password", error)

    }


  };

  return (
    <div className="flex justify-center mt-20">
      <form className="p-6 bg-white rounded shadow w-80" onSubmit={handleSendOtp}>
        <h2 className="text-xl font-bold mb-3">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Send OTP
        </button>

        {msg && <p className="text-green-600 mt-3">{msg}</p>}
      </form>
    </div>
  );
};




