import React, { useState } from "react";
import Navbar from "../components/Navbar";

const doctorCategories = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Richard James",
    available: true,
    category: "General Physician",
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
    category: "General Physician",
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
  {
    id: 11,
    name: "Dr. Zoe Kelly",
    available: true,
    category: "Neurologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc11.png",
  },
  {
    id: 12,
    name: "Dr. Patrick Harris",
    available: true,
    category: "Gastroenterologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc12.png",
  },
  {
    id: 13,
    name: "Dr. Chloe Evans",
    available: true,
    category: "General Physician",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc13.png",
  },
  {
    id: 14,
    name: "Dr. Ryan Martinez",
    available: true,
    category: "Gynecologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc14.png",
  },
  {
    id: 15,
    name: "Dr. Amelia Hill",
    available: true,
    category: "Dermatologist",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc15.png",
  },
];

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const handleOpenFilters = () => {
    setOpen((prev) => !prev);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredDoctors = selectedCategory
    ? doctors.filter((doc) => doc.category === selectedCategory)
    : doctors;

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={handleOpenFilters}
          className={`${open ? "bg-blue-500 text-white" : ""} py-1 px-3 border cursor-pointer rounded text-sm transition-all sm:hidden`}
        >
          Filters
        </button>

        {open && (
          <div className="flex flex-col md:hidden gap-4 text-sm">
            {doctorCategories.map((cat, index) => (
              <p
                key={index}
                className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer"
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpen(false);
                }}
              >
                {cat}
              </p>
            ))}
          </div>
        )}

        <div className="flex-col gap-4 text-sm text-gray-600 hidden sm:flex">
          {doctorCategories.map((cat, index) => (
            <p
              key={index}
              className={`${selectedCategory === cat ? "bg-blue-500 text-white" : ""} w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat ? "" : cat);

                // console.log(`${index + 1}th box clicked`);
              }}
            >
              {cat}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
            >
              <img
                className="bg-[#EAEFFF]"
                src={doc.image}
                alt="doctor image"
              />
              <div className="p-4">
                <div
                  className={`${doc.available ? "flex items-center gap-2 text-sm text-center text-green-500" : "flex items-center gap-2 text-sm text-center text-red-500"}`}
                >
                  <p
                    className={`${doc.available ? "w-2 h-2 rounded-full bg-green-500" : "w-2 h-2 rounded-full bg-red-500"}`}
                  ></p>
                  <p>{doc.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">{doc.name}</p>
                <p className="text-[#5C5C5C] text-sm">{doc.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
