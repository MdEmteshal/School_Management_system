import React, { useState, useEffect } from "react";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { HiArrowLeft } from "react-icons/hi";
import {ClipLoader} from "react-spinners"

export default function EditEvents() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [updateLoading,setUpdateLoading]=useState(false);
  

  const [eventsImage, setEventsImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [getimage, setGetImage] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  // pagination varibles

  const [page, setpage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const limit = 3
  const [limitedData, setLimitedData] = useState([])

  const handleGetEvents = async () => {
    try {
      const result = await axios.get(
        backendUrl + `/admin/events/getevents?page=${page}&limit=${limit}`,
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


  console.log("page", page)
  console.log("totalpages", totalPage)

  useEffect(() => {
    handleGetEvents();
  }, [page]);

  async function handleSave() {
    const formData = new FormData();
    if (eventsImage) formData.append("image", eventsImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true)
      await axios.post(
        backendUrl + "/admin/events/uploadevents",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Event Uploaded");
      handleGetEvents();
      setTitle("");
      setDescription("");
      setEventsImage(null);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Upload Failed");
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.post(
        backendUrl + "/admin/events/deleteevents",
        { id },
        { withCredentials: true }
      );
      toast.success("Deleted Successfully");
      handleGetEvents();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);
    if (updateImage) formData.append("image", updateImage);

    try {
      setUpdateLoading(true)
      
      await axios.post(
        backendUrl + "/admin/events/updateevents",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Updated Successfully");
      handleGetEvents();
      setOpen(false);
      setUpdateLoading(false)
    } catch (error) {
      setUpdateLoading(false) 
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-10">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 font-semibold mb-6 hover:text-orange-800"
      >
        <HiArrowLeft size={22} />
        Back
      </button>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 max-h-112 overflow-y-auto">

        {limitedData?.map((img, index) => (
          <div key={img._id}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">

              <div className="flex items-center gap-4">
                <span className="font-bold">{index + 1}.</span>
                <img
                  src={img.imageUrl}
                  alt=""
                  className="w-24 h-16 object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-lg">{img.title}</h1>
                <p className="text-gray-600">{img.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOpen(true);
                    setSelectedImage(img);
                    setTitle(img.title);
                    setDescription(img.description);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="text-red-500 font-semibold"
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



      {/* Pagination UI */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        <button className="px-3 py-1 border rounded hover:bg-orange-100" disabled={page === 1}
          onClick={() => setpage((prev) => prev - 1)}>
          Prev
        </button>

        <h1 className="px-4 py-2 bg-orange-600 text-white rounded">
          {page} of {totalPage}
        </h1>

        <button className="px-3 py-1 border rounded hover:bg-orange-100" disabled={page === totalPage} value={page} onClick={() => setpage(page + 1)}>
          Next
        </button>

      </div>


      {/* Upload Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="bg-white mt-8 rounded-xl shadow-md p-4 md:p-6 grid md:grid-cols-4 gap-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEventsImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded"
       disabled={loading} >
          {loading? <ClipLoader size={30} color="white"/>:"Save"}
          
        </button>
      </form>

      {/* Popup */}
      {open && selectedImage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] md:w-125 rounded-xl p-6">

            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">Update Event</h2>
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
                accept="image/*"
                onChange={(e) => setUpdateImage(e.target.files[0])}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded" disabled={updateLoading}
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



