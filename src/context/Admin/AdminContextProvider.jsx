import { useState } from "react";
import AdminContext from "./adminContext.js";

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, adminAuthenticated, setAdminAuthenticated }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
