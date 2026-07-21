import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import { Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
        <img
          src={assets.logo}
          alt="MediSlot Logo"
          className="w-36 sm:w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <ul className="hidden md:flex items-center gap-5 font-medium">
          {navLinks.map((link, index) => (
            <li key={link.link}>
              <NavLink
                to={link.link}
                end={link.link === "/"}
                className={({ isActive }) =>
                  index === 4
                    ? "border-2 border-gray-200 px-7 py-1 rounded-full text-base font-medium hover:bg-gray-50 transition-all duration-300"
                    : `pb-1 border-b-2 transition-all duration-300 ${
                        isActive
                          ? "border-b-primary"
                          : "border-b-transparent hover:border-b-gray-500"
                      }`
                }
              >
                {link.title.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            title="Create Account"
            className="text-white bg-[#5F6FFF] rounded-full active:bg-blue-800 transition-all duration-300 ease-in-out"
          />
        </div>

        <button
          onClick={handleOpenMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <img
            src={assets.logo}
            alt="MediSlot Logo"
            className="w-36 cursor-pointer"
            onClick={() => handleNavigate("/")}
          />

          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col px-5 py-7">
          <p className="text-xs font-medium text-gray-400 mb-4 px-3">MENU</p>

          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.link}
                to={link.link}
                end={link.link === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  index === 4
                    ? "mt-4 text-center border border-gray-300 rounded-full px-5 py-3 font-medium hover:bg-gray-50 transition-all"
                    : `px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          <Button
            title={"Create Account"}
            className={
              "text-white bg-[#5F6FFF] rounded-full active:bg-blue-800 transition-all duration-300 ease-in-out"
            }
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
