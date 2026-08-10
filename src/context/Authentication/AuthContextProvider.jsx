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
          setAuthenticated(true);
        });
      } catch (error) {
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
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
