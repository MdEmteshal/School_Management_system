import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const galleryData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    title: "Annual Function",
    desc: "Students performing cultural activities",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1600442715817-7a4f9b5c47f5",
    title: "Sports Day",
    desc: "Exciting sports events and activities",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Classroom",
    desc: "Interactive learning environment",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178",
    title: "Library",
    desc: "Peaceful reading atmosphere",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "Computer Lab",
    desc: "Modern computer facilities",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    title: "Annual Function",
    desc: "Students performing cultural activities",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1600442715817-7a4f9b5c47f5",
    title: "Sports Day",
    desc: "Exciting sports events and activities",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Classroom",
    desc: "Interactive learning environment",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178",
    title: "Library",
    desc: "Peaceful reading atmosphere",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "Computer Lab",
    desc: "Modern computer facilities",
  },
];

export default function SchoolGallery() {

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


  return (
    <div className="px-4 py-10 bg-orange-50">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
        School Gallery
      </h2>

      {/* Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {galleryData.map((item) => (
          <div
            key={item.id}
            className="min-w-62.5 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-orange-200"
          >
            {/* Square Image */}
            <div className="aspect-square overflow-hidden rounded-t-xl">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Text */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-orange-600">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
