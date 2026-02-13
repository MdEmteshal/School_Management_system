import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";

export default function PrincipalNotice() {

  const [getimage, setGetImage] = useState([])

  const handleGetPrincipalImage = async () => {
    try {
      const result = await axios.get(backendUrl + "/admin/principal/getprincipal", { withCredentials: true })
      console.log(result.data)
      setGetImage(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetPrincipalImage()
  }, [])
  return (
    <div className="w-full bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">

        {/* 🔹 Left Part – Principal */}
        <div className="flex flex-col items-center text-center">

          {getimage.map((img, index) => (

            <img key={index}
              src={img.imageUrl}
              alt="Principal"
              className="w-40 h-40 rounded-full border-4 border-orange-400 object-cover"
            />
          ))}
          <h2 className="mt-4 text-2xl font-bold text-orange-600">
            Principal Name
          </h2>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Welcome to our institution. Our goal is to provide quality education
            and build strong character in every student. Discipline, knowledge
            and values are our top priority.
          </p>
        </div>

        {/* 🔸 Right Part – Notice Board */}
        <div className="bg-orange-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-orange-700 mb-4 border-b-2 border-orange-400 pb-2">
            📢 Notice Board
          </h2>

          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="block bg-white p-3 rounded-lg shadow hover:bg-orange-200 text-orange-700 font-medium transition"
              >
                🔔 Admission Open 2025
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block bg-white p-3 rounded-lg shadow hover:bg-orange-200 text-orange-700 font-medium transition"
              >
                📝 Exam Schedule Released
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block bg-white p-3 rounded-lg shadow hover:bg-orange-200 text-orange-700 font-medium transition"
              >
                🎉 Annual Function Notice
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
