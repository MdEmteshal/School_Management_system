import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const toppers = [
  {
    id: 1,
    name: "Aman Kumar",
    class: "10th",
    marks: "485 / 500",
    percentage: "97%",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Neha Singh",
    class: "9th",
    marks: "470 / 500",
    percentage: "94%",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Rahul Verma",
    class: "12th",
    marks: "460 / 500",
    percentage: "92%",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 4,
    name: "Pooja Sharma",
    class: "11th",
    marks: "455 / 500",
    percentage: "91%",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 5,
    name: "Rohit Das",
    class: "10th",
    marks: "448 / 500",
    percentage: "89%",
    image: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    class: "8th",
    marks: "440 / 500",
    percentage: "88%",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 7,
    name: "Vikas Singh",
    class: "9th",
    marks: "435 / 500",
    percentage: "87%",
    image: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: 8,
    name: "Aman Kumar",
    class: "10th",
    marks: "485 / 500",
    percentage: "97%",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 9,
    name: "Neha Singh",
    class: "9th",
    marks: "470 / 500",
    percentage: "94%",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 10,
    name: "Rahul Verma",
    class: "12th",
    marks: "460 / 500",
    percentage: "92%",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 11,
    name: "Pooja Sharma",
    class: "11th",
    marks: "455 / 500",
    percentage: "91%",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 12,
    name: "Rohit Das",
    class: "10th",
    marks: "448 / 500",
    percentage: "89%",
    image: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 13,
    name: "Anjali Gupta",
    class: "8th",
    marks: "440 / 500",
    percentage: "88%",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 14,
    name: "Vikas Singh",
    class: "9th",
    marks: "435 / 500",
    percentage: "87%",
    image: "https://i.pravatar.cc/150?img=36",
  },
];

export default function StudentTopper() {


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
    <div className="bg-orange-50 p-6">
      <h2 className="text-center text-2xl font-bold text-orange-600 mb-5">
        🏆 Our School Toppers
      </h2>

      {/* Vertical Scroll */}
      <div className="max-h-105 overflow-y-auto pr-2">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
            gap-4
          "
        >
          {toppers.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl p-4 text-center border border-orange-200 shadow hover:shadow-orange-300 transition"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-orange-500"
              />

              <h4 className="mt-2 text-sm font-semibold text-orange-600">
                {student.name}
              </h4>

              <p className="text-xs text-gray-600">
                Class: {student.class}
              </p>
              <p className="text-xs text-gray-600">
                Marks: {student.marks}
              </p>

              <p className="mt-1 font-bold text-orange-700 text-sm">
                {student.percentage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
