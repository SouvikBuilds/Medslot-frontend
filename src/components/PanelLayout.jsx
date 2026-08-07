import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  UserPlus,
  Users,
  LogOut,
  User,
} from "lucide-react";
import AdminContext from "../context/Admin/adminContext.js";
import DoctorContext from "../context/Doctor/doctorContext.js";
import { logOutUser, logOutDoctor } from "../api/api.js";
import { assets } from "../assets/assets_frontend/assets.js";

const PanelLayout = ({ role }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, setAdminAuthenticated } = useContext(AdminContext);
  const { doctor, setDoctor, setDoctorAuthenticated } =
    useContext(DoctorContext);

  const isAdmin = role === "admin";

  const adminLinks = [
    { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin-appointments", label: "Appointments", icon: CalendarDays },
    { to: "/add-doctor", label: "Add Doctor", icon: UserPlus },
    { to: "/doctor-list", label: "Doctors List", icon: Users },
  ];

  const doctorLinks = [
    { to: "/doctor-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/doctor-appointments", label: "Appointments", icon: CalendarDays },
    { to: "/doctor-profile", label: "Profile", icon: User },
  ];

  const links = isAdmin ? adminLinks : doctorLinks;

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        await logOutUser();
        setAdmin(null);
        setAdminAuthenticated(false);
        navigate("/admin");
      } else {
        await logOutDoctor();
        setDoctor(null);
        setDoctorAuthenticated(false);
        navigate("/admin");
      }
    } catch {
      if (isAdmin) {
        setAdmin(null);
        setAdminAuthenticated(false);
        navigate("/admin");
      } else {
        setDoctor(null);
        setDoctorAuthenticated(false);
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.logo} alt="logo" className="w-28 sm:w-36" />
          <span className="border border-gray-400 rounded-full text-xs px-2.5 py-0.5 text-gray-600">
            {isAdmin ? "Admin" : "Doctor"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#5F6FFF] text-white text-sm px-6 py-2 rounded-full cursor-pointer hover:bg-[#4f5ee8] transition-all"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="min-h-full w-16 sm:w-64 border-r bg-white">
          <ul className="mt-5">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 sm:px-6 cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden sm:block text-sm font-medium">
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 sm:p-8 bg-gray-50 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;
