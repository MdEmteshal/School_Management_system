import React, { useState, useEffect } from "react";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import {ClipLoader} from "react-spinners"

export default function EditGallery() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [updateLoading,setUpdateLoading]=useState(false);
  

  const [galleryImage, setGalleryImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [getimage, setGetImage] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);



  // pagination varibles

  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const limit = 3
  const [limitedData, setLimitedData] = useState([])

  // ================= GET =================
  const handleGetGallery = async () => {
    try {
      const result = await axios.get(
        backendUrl + `/admin/gallery/getgallery?currentPage=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );
      setGetImage(result.data);

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



  // ================= SAVE =================
  async function handleSave() {
    const formData = new FormData();
    if (galleryImage) {
      formData.append("image", galleryImage);
    }
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true)
      await axios.post(
        backendUrl + "/admin/gallery/uploadgallery",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Image Uploaded Successfully");
      setTitle("");
      setDescription("");
      setGalleryImage(null);
      handleGetGallery();
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      toast.error("Image Upload Failed");
    }
  }

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.post(
        backendUrl + "/admin/gallery/deletegallery",
        { id },
        { withCredentials: true }
      );
      toast.success("Image Deleted Successfully");
      handleGetGallery();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);

    if (updateImage) {
      formData.append("image", updateImage);
    }

    try {
      setUpdateLoading(true)
      await axios.post(
        backendUrl + "/admin/gallery/updategallery",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Image Updated Successfully");
      setOpen(false);
      handleGetGallery();
      setUpdateLoading(false)
    } catch (error) {
      setUpdateLoading(false)
      toast.error("Update Failed");
    }
  };



  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 font-semibold mb-6 hover:text-orange-800"
      >
        <HiArrowLeft size={22} /> Back
      </button>

      {/* ================= Gallery List ================= */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {limitedData?.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow-md p-4 border border-orange-100 min-w-70"
            >
              <img
                src={img.imageUrl}
                alt=""
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h2 className="font-bold text-lg text-orange-600">
                {img.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3">
                {img.description}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setSelectedImage(img);
                    setTitle(img.title);
                    setDescription(img.description);
                    setOpen(true);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(img._id)}
                  className="text-red-500 font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="px-4 py-2 bg-orange-400 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>

        <h1 className="px-4 py-2 bg-orange-600 text-white rounded">
          {currentPage} of {totalPage}
        </h1>

        <button
          disabled={currentPage === totalPage}
          onClick={() => setPage(currentPage + 1)} value={currentPage}
          className="px-4 py-2 bg-orange-400 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* ================= Add Form ================= */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-10 border border-orange-100">
        <h2 className="text-xl font-bold text-orange-600 mb-4">
          Add New Image
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="file"
            onChange={(e) => setGalleryImage(e.target.files[0])}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg md:col-span-2" disabled={loading}
          >
            {loading? <ClipLoader size={30} color="white"/>:"Save"}
            
          </button>
        </form>
      </div>

      {/* ================= Popup ================= */}
      {open && selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] md:w-125 rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-orange-600">Update Image</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedImage.imageUrl}
              alt=""
              className="w-full h-40 object-cover rounded mb-4"
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedImage._id);
              }}
              className="grid gap-3"
            >
              <input
                type="file"
                onChange={(e) => setUpdateImage(e.target.files[0])}
                className="border p-2 rounded"
              />

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded" disabled={updateLoading}
              >
                  {updateLoading? <ClipLoader size={30} color="white"/>:"Update"}
                
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


