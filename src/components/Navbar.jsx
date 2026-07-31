import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import {
  Menu,
  X,
  User2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";
import AuthContext from "../context/Authentication/authContext.js";
import { logOutUser } from "../api/api.js";

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
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const {
    user,
    authenticated,
    loading,
    setUser,
    setAuthenticated,
    setLoading,
  } = useContext(AuthContext);

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
    setProfileOpen(false);
  };

  const handleNavigate = (path) => {
    setOpen(false);
    setProfileOpen(false);
    navigate(path);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfileOpen = () => {
    setProfileOpen((prev) => !prev);
  };

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const response = await logOutUser();
      setUser(null);
      setAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log("Error while logging out user", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
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
                target={index === 4 ? "_blank" : "_self"}
                className={({ isActive }) =>
                  index === 4
                    ? "border-2 border-gray-200 px-7 py-1 rounded-full text-base font-medium hover:bg-gray-50 transition-all duration-300"
                    : `pb-1 border-b-2 transition-all duration-300 ${
                        isActive
                          ? "border-b-[#5F6FFF]"
                          : "border-b-transparent hover:border-b-gray-500"
                      }`
                }
              >
                {link.title.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        {user ? (
          <div className="relative hidden md:block">
            <div
              onClick={handleProfileOpen}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <User2 className="w-6 h-6 text-gray-600" />
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email || "user@example.com"}
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                profileOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-gray-700 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || "user@example.com"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate("/my-profile")}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <User2 className="w-5 h-5" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/my-appointments")}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <CalendarDays className="w-5 h-5" />
                <span>My Appointments</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 border-t border-gray-100 hover:bg-red-50 transition-all cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:block" onClick={handleLogin}>
            <Button
              title="Create Account"
              className="text-white bg-[#5F6FFF] rounded-full active:bg-blue-800 transition-all duration-300 ease-in-out"
            />
          </div>
        )}

        <div className="md:hidden flex items-center gap-2">
          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={handleProfileOpen}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
              >
                <User2 className="w-6 h-6 text-gray-600" />
              </button>

              <div
                className={`absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                  profileOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-700 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || "user@example.com"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate("/my-profile")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <User2 className="w-5 h-5" />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate("/my-appointments")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <CalendarDays className="w-5 h-5" />
                  <span>My Appointments</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 border-t border-gray-100 hover:bg-red-50 transition-all cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleOpenMenu}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
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
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
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
                target={index === 4 ? "_blank" : "_self"}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
