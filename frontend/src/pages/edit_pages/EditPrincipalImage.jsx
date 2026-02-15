import React, { useState } from 'react'
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import {ClipLoader} from "react-spinners"
import { useEffect } from 'react';
export default function EditPrincipal() {
  const [principalImage, setPrincipalImage] = useState(null)
  const [updateImage, setUpdateImage] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [getimage, setGetImage] = useState([])
  const [loading,setLoading]=useState(false)

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



  async function handleSave() {

    const formData = new FormData();

    if (principalImage) {
      formData.append("image", principalImage)
    }

    formData.append("name", name)
    formData.append("description", description)

    try {
      setLoading(true)
      const result = await axios.post(backendUrl + "/admin/principal/uploadprincipal", formData, {
        headers: {

          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      console.log(result.data)
      toast.success("Image  Upload")
      handleGetPrincipalImage()
    } catch (error) {
      setLoading(false)
      console.log("principal Upload error",error)
       console.log("error principal Image Upload:",
                    error?.response?.data?.message
                )
      
      toast.error("Image Upload  failed")

    }

  }


  // DELETE IMAGE
  const handleDelete = async (id) => {
    try {
      const result = await axios.post(backendUrl + "/admin/principal/deleteprincipal", { id }, { withCredentials: true })
      console.log("deleted carousel successfully", result.data)
      toast.success("Image  Deleted successfully")
      handleGetPrincipalImage()
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
    formData.append("description", description)

    if (updateImage) {
      formData.append("image", updateImage)
    }
    try {
      setLoading(true)
      const result = await axios.post(backendUrl + "/admin/principal/updateprincipal", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
      console.log("updated carousel successfully", result.data)
      toast.success("Image updated successfully")
      handleGetPrincipalImage()
      setOpen(false);
    } catch (error) {
      setLoading(false)
      console.log({ error: error.message })
      toast.error("Image updated failed")
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-10">

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
      >
        ← Back
      </button>

      {/* ================= LIST SECTION ================= */}
      {getimage && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-4 md:p-6">

          {getimage.map((img, index) => (
            <div key={img.imageUrl}>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">

                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{index + 1}.</span>

                  <img
                    src={img.imageUrl}
                    alt="principal"
                    className="w-24 h-20 object-cover rounded-lg border"
                  />
                </div>

                {/* Center Info */}
                <div className="flex-1">
                  <h1 className="font-bold text-lg">{img.name}</h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    {img.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedImage(img);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(img._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {index !== getimage.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD FORM ================= */}
      {getimage.length !== 1 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row flex-wrap gap-6"
        >

          <div className="w-full md:w-[30%]">
            <label className="block mb-1 font-semibold">Principal Image</label>
            <input
              type="file"
              onChange={(e) => setPrincipalImage(e.target.files[0])}
              accept="image/*"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="w-full md:w-[30%]">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="w-full md:w-[30%]">
            <label className="block mb-1 font-semibold">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="w-full md:w-[30%]">
            <button
              type="submit"
              onClick={handleSave}
              disabled={getimage?.length === 1}
              className={`w-full py-2 rounded-lg text-white font-semibold
            ${getimage?.length === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
                }`} disabled={loading}
            >
              {loading?<ClipLoader size={30} color="white"/> :" Save"}
              
            </button>
          </div>
        </form>
      )}

      {/* ================= POPUP ================= */}
      {open && selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Update Data</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedImage.imageUrl}
              alt=""
              className="w-24 h-24 object-cover rounded mb-4"
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
                accept="image/*"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg" disabled={loading}
              >
                 {loading?<ClipLoader size={30} color="white"/> :" Update"}
                
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}





