import React from "react";

const faculties = [
  {
    id: 1,
    name: "Mr. Rajesh Kumar",
    experience: "10 Years",
    specialization: "Mathematics",
    qualification: "M.Sc, B.Ed",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ms. Pooja Sharma",
    experience: "8 Years",
    specialization: "Science",
    qualification: "M.Sc, B.Ed",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Mr. Amit Verma",
    experience: "12 Years",
    specialization: "English",
    qualification: "M.A, B.Ed",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 4,
    name: "Ms. Neha Singh",
    experience: "6 Years",
    specialization: "Computer",
    qualification: "MCA, B.Ed",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Mr. Rajesh Kumar",
    experience: "10 Years",
    specialization: "Mathematics",
    qualification: "M.Sc, B.Ed",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 6,
    name: "Ms. Pooja Sharma",
    experience: "8 Years",
    specialization: "Science",
    qualification: "M.Sc, B.Ed",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 7,
    name: "Mr. Amit Verma",
    experience: "12 Years",
    specialization: "English",
    qualification: "M.A, B.Ed",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 8,
    name: "Ms. Neha Singh",
    experience: "6 Years",
    specialization: "Computer",
    qualification: "MCA, B.Ed",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function FacultySection() {
  return (
    <div className="w-full bg-orange-50 py-8 px-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
        Our Faculties
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {faculties.map((faculty) => (
          <div
            key={faculty.id}
            className="min-w-62.5 bg-white border border-orange-200 rounded-xl shadow-md hover:shadow-lg transition-all p-5 text-center"
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-28 h-28 rounded-full mx-auto border-4 border-orange-400 object-cover"
            />

            <h3 className="text-lg font-semibold text-orange-600 mt-4">
              {faculty.name}
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Experience:</span>{" "}
              {faculty.experience}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Specialization:</span>{" "}
              {faculty.specialization}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Qualification:</span>{" "}
              {faculty.qualification}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
