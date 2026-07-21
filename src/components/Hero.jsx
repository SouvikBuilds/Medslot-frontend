import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-[#5F6FFF] rounded-lg px-6 md:px-10 lg:px-20 ">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:-mb-7.5">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />

          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img
            className="w-3"
            src="data:image/svg+xml,%3csvg%20width='16'%20height='12'%20viewBox='0%200%2016%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%206H15M15%206L10.8378%201M15%206L10.8378%2011'%20stroke='%23595959'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
            alt=""
          />
        </a>
      </div>

      <div className="md:w-1/2 relative">
        <img
          class="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="header image"
        ></img>
      </div>
    </div>
  );
};

export default Hero;
