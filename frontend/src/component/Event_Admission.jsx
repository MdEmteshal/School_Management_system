import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const events = [
  {
    id: 1,
    title: "Annual Sports Day",
    desc: "Our students participated enthusiastically in sports events.",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  },
  {
    id: 2,
    title: "Science Exhibition",
    desc: "Creative science models by students.",
    img: "https://images.unsplash.com/photo-1581091870622-2c4c4c1f1b91",
  },
  {
    id: 3,
    title: "Cultural Fest",
    desc: "Dance, music and drama performances.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  },
];

export default function EventAndAdmission() {

  //the pagination is not currenty use for the main perpous of demo of the project then the demo or representatio are once completed succesfully we use inthis page pagination 


  // pagination varibles

  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const limit = 12
  const [limitedData, setLimitedData] = useState([])

  // ================= GET =================
  const handleGetGallery = async () => {
    try {
      const result = await axios.get(
        backendUrl + `/admin/gallery/getgallery?currentPage=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );

      console.log("pagination data new:", result.data)
      setLimitedData(result.data.limitedDataFectch)
      setTotalPage(result.data.totalPages)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetGallery();
  }, [currentPage]);


  console.log("page", currentPage)
  console.log("totalpages", totalPage)




  // Admission Forms



  const [formData, setFormData] = useState({
    parentsName: "",
    phone: "",
    studentName: "",
    studentClass: "",

  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        backendUrl + "/api/admission/admissionenquery",
        formData
      );
      setMessage(res.data.message);
      setFormData({ parentsName: "", phone: "", studentName: "", studentClass: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full bg-orange-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 🔶 LEFT : SCHOOL EVENTS */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            School Events
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="min-w-55 bg-white rounded-xl shadow-md border border-orange-200"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-orange-700">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔶 RIGHT : ADMISSION ENQUIRY FORM */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Admission Enquiry
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="parentsName"
              placeholder="Parent's Name"
              value={formData.parentsName}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="studentClass"
              placeholder="Student Class"
              value={formData.studentClass}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? "Submit Enquiry..." : "Submit Enquiry"}

            </button>

            {message && (
              <p className="text-center text-sm mt-3 text-red-500">
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
