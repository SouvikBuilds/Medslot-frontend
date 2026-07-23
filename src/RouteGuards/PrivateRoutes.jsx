import React, { useContext } from "react";
import AuthContext from "../context/Authentication/authContext.js";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, authenticated, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-2">
        <LoaderCircle className="animate-spin h-10 w-10 text-[#5F6FFF]" />
        <p>Please wait...</p>
      </div>
    );
  }
  if (!authenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
