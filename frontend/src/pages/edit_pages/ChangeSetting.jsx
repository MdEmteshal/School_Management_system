import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const SimpleSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-2xl p-6 space-y-4 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-orange-600 hover:text-orange-800"
        >
          <HiArrowLeft size={24} />
        </button>

        <h2 className="text-2xl font-bold text-orange-600 text-center mb-4">
          Settings
        </h2>

        {/* Change Banner */}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Change Banner
          </span>
          <button
            onClick={() => navigate("/upload-carousel")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>

        {/* Change Principal Data */}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Change Principal Data
          </span>
          <button
            onClick={() => navigate("/principal")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>

        {/* Change Student Topper Lists*/}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Change Student Topper Lists
          </span>
          <button
            onClick={() => navigate("/student-topper")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>


        {/* Change Events*/}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Change Events
          </span>
          <button
            onClick={() => navigate("/events")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>

        {/* Change Faculty*/}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Change faculty
          </span>
          <button
            onClick={() => navigate("/faculty")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>

        {/* Add Gallery*/}
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg">
          <span className="text-gray-700 font-medium">
            Add Gallery
          </span>
          <button
            onClick={() => navigate("/gallery")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Go
          </button>
        </div>

      </div>
    </div>
  );
};

export default SimpleSettings;
