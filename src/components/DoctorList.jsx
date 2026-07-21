import React from "react";
import { useNavigate } from "react-router-dom";
const doctors = [
  {
    id: 1,
    name: "Dr. Richard James",
    available: true,
    category: "General physician",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png",
  },
  {
    id: 2,
    name: "Dr. Emily Larson",
    available: true,
    category: "Gynecologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc2.png",
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    available: true,
    category: "Dermatologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc3.png",
  },
  {
    id: 4,
    name: "Dr. Christopher Lee",
    available: true,
    category: "Pediatricians",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc4.png",
  },
  {
    id: 5,
    name: "Dr. Jennifer Garcia",
    available: true,
    category: "Neurologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc5.png",
  },
  {
    id: 6,
    name: "Dr. Andrew Williams",
    available: true,
    category: "Gastroenterologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc6.png",
  },
  {
    id: 7,
    name: "Dr. Christopher Davis",
    available: true,
    category: "General physician",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc7.png",
  },
  {
    id: 8,
    name: "Dr. Timothy White",
    available: true,
    category: "Gynecologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc8.png",
  },
  {
    id: 9,
    name: "Dr. Ava Mitchell",
    available: true,
    category: "Dermatologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc9.png",
  },
  {
    id: 10,
    name: "Dr. Jeffrey King",
    available: true,
    category: "Pediatricians",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc10.png",
  },
];

const DoctorList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>

      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors
          .filter((doctor) => doctor.available === true)
          .map((doctor) => (
            <div
              key={doctor.id}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-[#EAEFFF]" src={doctor.image} alt="" />

              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{doctor.category}</p>
              </div>
            </div>
          ))}
      </div>

      <button
        className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
        onClick={() => navigate("/doctors")}
      >
        more
      </button>
    </div>
  );
};

export default DoctorList;
