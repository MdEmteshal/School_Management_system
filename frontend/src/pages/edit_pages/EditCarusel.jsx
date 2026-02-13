import React, { useState, useEffect } from "react";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { HiArrowLeft } from "react-icons/hi";

export default function EditCarusel() {
  const navigate = useNavigate();

  const [carouselImage, setCarouselImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [getimage, setGetImage] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGetCarouselImage = async () => {
    try {
      const result = await axios.get(
        backendUrl + "/admin/getcarousel",
        { withCredentials: true }
      );
      setGetImage(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCarouselImage();
  }, []);

  async function handleSave() {
    const formData = new FormData();
    if (carouselImage) {
      formData.append("image", carouselImage);
    }

    try {
      await axios.post(
        backendUrl + "/admin/uploadcarousel",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Image Upload");
      handleGetCarouselImage();
    } catch (error) {
      toast.error("Image Upload failed");
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.post(
        backendUrl + "/admin/deletecarousel",
        { id },
        { withCredentials: true }
      );
      toast.success("Image Deleted successfully");
      handleGetCarouselImage();
    } catch (error) {
      toast.error("Image deleted failed");
    }
  };

  const handleUpdate = async (id) => {
    setOpen(false);
    const formData = new FormData();
    formData.append("id", id);
    if (updateImage) {
      formData.append("image", updateImage);
    }

    try {
      await axios.post(
        backendUrl + "/admin/updatecarousel",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Image updated successfully");
      handleGetCarouselImage();
    } catch (error) {
      toast.error("Image updated failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-orange-100">
      <div className="p-6 max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/change-settings")}
          className="flex items-center gap-2 text-orange-600 mb-6 hover:text-orange-800"
        >
          <HiArrowLeft size={22} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-orange-600">
          Manage Carousel Images
        </h1>

        {/* Image List */}
        <div className="bg-white shadow-lg rounded-xl p-5 mb-8">
          {getimage.map((img, index) => (
            <div key={img._id}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">

                {/* Image Section */}
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-600">
                    {index + 1}.
                  </span>

                  <img
                    src={img.imageUrl}
                    alt="carousel"
                    className="w-28 h-20 object-cover rounded-lg shadow"
                  />
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedImage(img);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(img._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
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

        {/* Upload Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Upload New Image
          </h2>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              onChange={(e) => setCarouselImage(e.target.files[0])}
              accept="image/*"
              className="border p-2 rounded-lg w-full md:w-1/2"
            />

            <button
              onClick={handleSave}
              disabled={getimage?.length === 3}
              className={`px-6 py-2 rounded-lg text-white transition w-full md:w-auto
                ${getimage?.length === 3
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                }`}
            >
              Save
            </button>
          </div>
        </div>

        {/* Popup */}
        {open && selectedImage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-125 rounded-xl p-6 shadow-xl">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Update Image</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedImage.imageUrl}
                alt=""
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(selectedImage._id);
                }}
              >
                <input
                  type="file"
                  onChange={(e) => setUpdateImage(e.target.files[0])}
                  accept="image/*"
                  className="w-full border p-2 rounded mb-4"
                />

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg"
                >
                  Upadte
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
