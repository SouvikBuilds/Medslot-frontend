import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments.jsx";
import MagicLogin from "./pages/MagicLogin.jsx";
import Appointment from "./pages/Appointment.jsx";

// Admin pages
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminAppointments from "./pages/admin/AdminAppointments.jsx";
import AddDoctor from "./pages/admin/AddDoctor.jsx";
import DoctorsList from "./pages/admin/DoctorsList.jsx";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";

// Layout
import PanelLayout from "./components/PanelLayout.jsx";
import WithOutNavbarFooter from "./components/WithOutNavbarFooter.jsx";

// Route guards
import PublicRoutes from "./RouteGuards/PublicRoutes.jsx";
import PrivateRoutes from "./RouteGuards/PrivateRoutes.jsx";

// Context providers
import AuthContextProvider from "./context/Authentication/AuthContextProvider.jsx";
import FormContextProvider from "./context/Form/FormContextProvider.jsx";
import AdminContextProvider from "./context/Admin/AdminContextProvider.jsx";
import DoctorContextProvider from "./context/Doctor/DoctorContextProvider.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // Login page for admin/doctor (no navbar/footer)
  {
    element: <WithOutNavbarFooter />,
    children: [
      { path: "/admin", element: <AdminPanel /> },
    ],
  },

  // Admin dashboard layout
  {
    element: <PanelLayout role="admin" />,
    children: [
      { path: "/admin-dashboard", element: <AdminDashboard /> },
      { path: "/admin-appointments", element: <AdminAppointments /> },
      { path: "/add-doctor", element: <AddDoctor /> },
      { path: "/doctor-list", element: <DoctorsList /> },
    ],
  },

  // Doctor dashboard layout
  {
    element: <PanelLayout role="doctor" />,
    children: [
      { path: "/doctor-dashboard", element: <DoctorDashboard /> },
      { path: "/doctor-appointments", element: <DoctorAppointments /> },
      { path: "/doctor-profile", element: <DoctorProfile /> },
    ],
  },

  // Main frontend with Navbar + Footer
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/appointment/:id", element: <Appointment /> },
      { path: "/magic-login", element: <MagicLogin /> },
      {
        element: <PublicRoutes />,
        children: [{ path: "/login", element: <Login /> }],
      },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/my-profile", element: <Profile /> },
          { path: "/my-appointments", element: <Appointments /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
          <FormContextProvider>
            <RouterProvider router={router} />
          </FormContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
