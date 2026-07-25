import { useEffect, useState } from "react";
import AuthContext from "./authContext.js";
import { getCurrentUser } from "../../api/api.js";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        await getCurrentUser().then((response) => {
          setUser(response.data.data);
          // console.log(user);
          setAuthenticated(true);
        });
      } catch (error) {
        console.log("Error while fetching current user");
        setError(error);
        setUser(null);
        setAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext
      value={{
        user,
        authenticated,
        loading,
        setUser,
        setAuthenticated,
        setLoading,
        authLoading,
        setAuthLoading,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
