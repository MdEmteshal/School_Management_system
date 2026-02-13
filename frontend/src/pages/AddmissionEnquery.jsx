import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router";


export default function AdmissionEnquiryList() {
  const navigate = useNavigate()

  // pagination varibles

  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const limit = 6
  const [limitedData, setLimitedData] = useState([])

  // ================= GET =================
  const handleGetAdmissionEnqueryStudentLists = async () => {
    try {
      const result = await axios.get(
        backendUrl + `/api/admission/getadmissionenquery?currentPage=${currentPage}&limit=${limit}`,
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
    handleGetAdmissionEnqueryStudentLists();
  }, [currentPage]);


  console.log("page", currentPage)
  console.log("totalpages", totalPage)

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Admission Enquiry List
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-center border">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 border">Parent Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Student Name</th>
              <th className="p-3 border">Student Class</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {limitedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border">{item.parentsName}</td>
                <td className="p-3 border">{item.phone}</td>
                <td className="p-3 border">{item.studentName}</td>
                <td className="p-3 border">{item.studentClass}</td>
                <td className="p-3 border">
                  {new Date(item.
                    createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() => navigate("/")}

          className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPage}
        </span>

        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>

      </div>

    </div>
  );
}
