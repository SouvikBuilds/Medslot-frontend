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
const router = createBrowserRouter([
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
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
