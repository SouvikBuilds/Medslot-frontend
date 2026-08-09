import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
const Specilaity = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/doctors");
  };
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-[#262626]"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>

      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img
            className="w-16 sm:w-24 mb-2 "
            src={assets.General_physician}
            alt=""
          />
          <p>General physician</p>
        </a>

        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img
            className="w-16 sm:w-24 mb-2 "
            src={assets.Gynecologist}
            alt=""
          />
          <p>Gynecologist</p>
        </a>

        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img
            className="w-16 sm:w-24 mb-2 "
            src={assets.Dermatologist}
            alt=""
          />
          <p>Dermatologist</p>
        </a>

        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img
            className="w-16 sm:w-24 mb-2 "
            src={assets.Pediatricians}
            alt=""
          />
          <p>Pediatricians</p>
        </a>

        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img className="w-16 sm:w-24 mb-2 " src={assets.Neurologist} alt="" />
          <p>Neurologist</p>
        </a>

        <a
          className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          onClick={handleClick}
        >
          <img
            className="w-16 sm:w-24 mb-2 "
            src={assets.Gastroenterologist}
            alt=""
          />
          <p>Gastroenterologist</p>
        </a>
      </div>
    </div>
  );
};

export default Specilaity;
