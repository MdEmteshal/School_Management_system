import React, { useState } from 'react'
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import {ClipLoader} from "react-spinners"

export default function EditStudentTopper() {
  const [loading,setLoading]=useState(false);
  const [updateLoading,setUpdateLoading]=useState(false);
  
  const [studentImage, setStudentImage] = useState(null)
  const [updateImage, setUpdateImage] = useState(null)

  const [name, setName] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [marks, setMarks] = useState("")
  const [percentage, setPercentage] = useState("")
  const [year, setYear] = useState("")

  const [getImage, setGetImage] = useState([])

  // pagination varibles

  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const limit = 3
  const [limitedData, setLimitedData] = useState([])

  const handleGetStudentTopper = async () => {
    try {
      const result = await axios.get(backendUrl + `/admin/studenttopper/getstudenttopper?currentPage=${currentPage}&limit=${limit}`, { withCredentials: true })
      console.log(result.data)
      setGetImage(result.data)
      console.log("pagination data new:", result.data)
      setLimitedData(result.data.limitedDataFectch)
      setTotalPage(result.data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetStudentTopper()
  }, [currentPage])



  // // ================= GET =================
  // const handleGetGallery = async () => {
  //   try {
  //     const result = await axios.get(
  //       backendUrl + `/admin/gallery/getgallery?currentPage=${currentPage}&limit=${limit}`,
  //       { withCredentials: true }
  //     );
  //     setGetImage(result.data);

  //     console.log("pagination data new:", result.data)
  //     setLimitedData(result.data.limitedDataFectch)
  //     setTotalPage(result.data.totalPages)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   handleGetGallery();
  // }, [currentPage]);


  console.log("page", currentPage)
  console.log("totalpages", totalPage)




  async function handleSave() {

    const formData = new FormData();

    if (studentImage) {
      formData.append("image", studentImage)
    }


    formData.append("name", name)
    formData.append("studentClass", studentClass)
    formData.append("marks", marks)
    formData.append("percentage", percentage)
    formData.append("year", year)


    try {
      setLoading(true);
      const result = await axios.post(backendUrl + "/admin/studenttopper/uploadstudenttopper", formData, {
        headers: {

          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      console.log(result.data)
      toast.success("Image  Upload")
      handleGetStudentTopper()
    } catch (error) {
      setLoading(false);
      console.log(error)
      toast.error("Image Upload  failed")

    }

  }


  // DELETE IMAGE
  const handleDelete = async (id) => {
    try {
      const result = await axios.post(backendUrl + "/admin/studenttopper/deletestudenttopper", { id }, { withCredentials: true })
      console.log("deleted Student Topper successfully", result.data)
      toast.success("Student Topper Image  Deleted successfully")
      handleGetStudentTopper()
    } catch (error) {
      console.log({ error: error.message })
      toast.error("Image deleted failed")
    }
  };






  // popup data

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)


  const handleUpdate = async (id) => {

    
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name)
    formData.append("studentClass", studentClass)
    formData.append("marks", marks)
    formData.append("percentage", percentage)
    formData.append("year", year)

    if (updateImage) {
      formData.append("image", updateImage)
    }
    try {
      setUpdateLoading(true);
      const result = await axios.post(backendUrl + "/admin/studenttopper/updatestudenttopper", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
      console.log("updated student Topper successfully", result.data)
      toast.success("student topper Image updated successfully")
      handleGetStudentTopper();
      setOpen(false);
    } catch (error) {
      setUpdateLoading(false);
      console.log({ error: error.message })
      toast.error("Image updated failed")
    }
  };




  return (
    <>
      <div className="h-screen bg-orange-50 flex flex-col">
        <div className="max-w-6xl w-full mx-auto px-4 py-4 flex-1 flex flex-col">

          {/* Back Button */}
          <div className="mb-3">
            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 text-sm rounded-md shadow"
            >
              ← Back
            </button>
          </div>

          {/* Student List Section */}
          <div className="bg-white rounded-xl shadow p-4 border border-orange-200 flex-1 flex flex-col">

            <h2 className="text-lg font-semibold text-orange-600 mb-3">
              Student Topper List
            </h2>

            {/* Scroll if more than 2 */}
            <div
              className={`space-y-3 ${getImage.length > 2
                ? "max-h-[45vh] overflow-y-auto pr-2"
                : ""
                }`}
            >
              {limitedData.map((img, index) => (
                <div
                  key={img._id}
                  className="flex items-center justify-between bg-orange-50 p-3 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-orange-600">
                      {index + 1}.
                    </span>

                    <img
                      src={img.imageUrl}
                      alt="student"
                      className="w-14 h-14 object-cover rounded border border-orange-300"
                    />

                    <div className="leading-tight">
                      <p className="font-medium">{img.name}</p>
                      <p>Class: {img.studentClass}</p>
                      <p>Marks: {img.marks}</p>
                      <p>{img.percentage}% | {img.year}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setSelectedImage(img);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(img._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}



            </div>

            {/* Pagination Buttons */}
            {totalPage > 1 && (
              <div className="flex justify-center items-center gap-3 mt-4 text-sm">

                <button
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  className={`px-3 py-1 rounded ${currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                >
                  Prev
                </button>

                <span className="font-semibold text-orange-600">
                  {currentPage} / {totalPage}
                </span>

                <button
                  disabled={currentPage === totalPage}
                  onClick={() => setPage(currentPage + 1)}
                  className={`px-3 py-1 rounded ${currentPage === totalPage
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                >
                  Next
                </button>

              </div>
            )}
          </div>

          {/* Add Student Form */}
          <div className="bg-white rounded-xl shadow p-4 mt-4 border border-orange-200">

            <h2 className="text-lg font-semibold text-orange-600 mb-3">
              Add Student
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm"
            >
              <input
                type="file"
                onChange={(e) => setStudentImage(e.target.files[0])}
                accept="image/*"
                className="border border-orange-300 rounded p-1.5 col-span-2 md:col-span-1"
              />

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-orange-300 rounded p-1.5"
              />

              <input
                type="text"
                placeholder="Class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="border border-orange-300 rounded p-1.5"
              />

              <input
                type="text"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="border border-orange-300 rounded p-1.5"
              />

              <input
                type="text"
                placeholder="Percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="border border-orange-300 rounded p-1.5"
              />

              <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border border-orange-300 rounded p-1.5"
              />

              <div className="col-span-2 md:col-span-3">
                <button
                  onClick={handleSave}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded w-full text-sm" disabled={loading}
                >
                  {loading? <ClipLoader size={30} color="white"/>:"Save Student"}
                  
                </button>
              </div>
            </form>
          </div>

          {/* ================= Popup ================= */}
          {open && selectedImage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-[95%] md:w-125 p-6 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-orange-600">
                    Update Faculty
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-red-500 text-lg"
                  >
                    ✕
                  </button>
                </div>

                <img
                  src={selectedImage.imageUrl}
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg mb-4 border-2 border-orange-400"
                />

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(selectedImage._id);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="file"
                    onChange={(e) => setUpdateImage(e.target.files[0])}
                    className="border p-2 rounded-lg w-full"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <input
                    type="text"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <input
                    type="text"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg" disabled={updateLoading}
                  >
                     {updateLoading? <ClipLoader size={30} color="white"/>:"Update"}
                    
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

    </>



  )
}

