import React from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "All Doctors",
    link: "/doctors",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Admin Panel",
    link: "/admin",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <ul className="md:flex items-center gap-5 font-medium hidden">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.link}
              className={
                index === 4
                  ? "border-2 border-gray-200 px-7 py-1 rounded-full text-base font-medium hover:bg-gray-50 transition-all duration-300"
                  : "pb-1 border-b-2 border-b-transparent hover:border-b-gray-500 transition-all duration-300"
              }
            >
              {link.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button title="Create Account" />
    </div>
  );
};

export default Navbar;
