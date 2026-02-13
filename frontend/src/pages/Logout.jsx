import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { setAdminData } from "../redux/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  async function handleLogout() {
    try {
      const result = await axios.post(backendUrl + "/admin/auth/logout", {}, { withCredentials: true })
      console.log(result.data)
      dispatch(setAdminData(null))

      toast.success('Logout Successfully')
      navigate("/")
    } catch (error) {
      console.log("Backend error message:",
        error?.response?.data?.message
      )
      dispatch(setAdminData(null))
      toast.error("logout failed")

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          Logging out...
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <p className="text-gray-600">
          Please wait while we securely log you out.
        </p>
      </div>
    </div>
  );
};

export default Logout;
