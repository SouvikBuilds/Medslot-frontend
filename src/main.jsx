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
import Login from "./pages/Login.jsx";
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
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <FormContextProvider>
    <RouterProvider router={router} />
  </FormContextProvider>,
);
