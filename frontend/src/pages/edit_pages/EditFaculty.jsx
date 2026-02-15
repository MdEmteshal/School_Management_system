import React, { useState, useEffect } from "react";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { HiArrowLeft } from "react-icons/hi";
import {ClipLoader} from "react-spinners"

export default function EditFaculty() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [updateLoading,setUpdateLoading]=useState(false);
  

  const [facultyImage, setFacultyImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);

  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");

  const [facultyData, setFacultyData] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // ================= GET =================
  const handleGetFaculty = async () => {
    try {
      const result = await axios.get(
        backendUrl + "/admin/faculty/getfaculty",
        { withCredentials: true }
      );
      setFacultyData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFaculty();
  }, []);

  // ================= SAVE =================
  const handleSave = async () => {
    const formData = new FormData();

    if (facultyImage) formData.append("image", facultyImage);
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("specialization", specialization);
    formData.append("qualification", qualification);

    try {
      setLoading(true)
      await axios.post(
        backendUrl + "/admin/faculty/uploadfaculty",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Faculty Added Successfully");
      handleGetFaculty();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Upload Failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.post(
        backendUrl + "/admin/faculty/deletefaculty",
        { id },
        { withCredentials: true }
      );

      toast.success("Deleted Successfully");
      handleGetFaculty();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("specialization", specialization);
    formData.append("qualification", qualification);

    if (updateImage) formData.append("image", updateImage);

    try {
      setUpdateLoading(true)
      await axios.post(
        backendUrl + "/admin/faculty/updatefaculty",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Updated Successfully");
      handleGetFaculty();
      setOpen(false);
      setUpdateLoading(false)
    } catch (error) {
      setUpdateLoading(false)
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 font-semibold mb-6"
      >
        <HiArrowLeft size={22} />
        Back
      </button>

      {/* ================= Faculty List ================= */}
      <div className="bg-white shadow-xl rounded-2xl p-4">

        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Faculty List
        </h2>
        <div className="max-h-100 overflow-y-auto pr-2">
          {facultyData.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b py-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-orange-600">
                  {index + 1}.
                </span>

                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg border-2 border-orange-400"
                />

                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.experience}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.specialization}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.qualification}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFaculty(item);
                    setName(item.name);
                    setExperience(item.experience);
                    setSpecialization(item.specialization);
                    setQualification(item.qualification);
                    setOpen(true);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Add Faculty Form ================= */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Add Faculty
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid md:grid-cols-3 gap-4"
        >
          <input
            type="file"
            onChange={(e) => setFacultyImage(e.target.files[0])}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg" disabled={loading}
          >
            {loading?<ClipLoader size={30} color="white"/>:"Save"}
            
          </button>
        </form>
      </div>

      {/* ================= Popup ================= */}
      {open && selectedFaculty && (
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
              src={selectedFaculty.imageUrl}
              alt=""
              className="w-24 h-24 object-cover rounded-lg mb-4 border-2 border-orange-400"
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedFaculty._id);
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border p-2 rounded-lg w-full"
              />

              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="border p-2 rounded-lg w-full"
              />

              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="border p-2 rounded-lg w-full"
              />

              <button
                type="submit"
                disabled={updateLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg"
              >
            {updateLoading?<ClipLoader size={30} color="white"/>:"Update"}
                
                
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


