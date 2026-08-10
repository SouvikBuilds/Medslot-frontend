import React, { useEffect } from "react";
import { useContext } from "react";
import { loginThroughMagicLink } from "../api/api.js";
import AuthContext from "../context/Authentication/authContext.js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const MagicLogin = () => {
  const {
    user,
    authenticated,
    loading,
    setUser,
    setAuthenticated,
    setLoading,
  } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        setLoading(true);
        const response = await loginThroughMagicLink(token);
        setUser(response.data);
        setAuthenticated(true);
        navigate("/");
        location.reload();
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    handleLogin();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <LoaderCircle className="animate-spin h-10 w-10 text-[#5F6FFF]" />
          <p>Please wait...</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MagicLogin;
