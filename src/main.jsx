import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Contact from "./pages/Contact.jsx";
import Doctors from "./pages/Doctors.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormContextProvider from "./context/Form/FormContextProvider.jsx";
import AuthContextProvider from "./context/Authentication/AuthContextProvider.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments.jsx";
import MagicLogin from "./pages/MagicLogin.jsx";
import PublicRoutes from "./RouteGuards/PublicRoutes.jsx";
import PrivateRoutes from "./RouteGuards/PrivateRoutes.jsx";
import WithOutNavbarFooter from "./components/WithOutNavbarFooter.jsx";
const router = createBrowserRouter([
  {
    element: <WithOutNavbarFooter />,
    children: [
      {
        path: "/admin",
        element: <AdminPanel />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/my-profile",
            element: <Profile />,
          },
          {
            path: "/my-appointments",
            element: <Appointments />,
          },
        ],
      },
      {
        path: "/magic-login",
        element: <MagicLogin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <FormContextProvider>
        <RouterProvider router={router} />
      </FormContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
