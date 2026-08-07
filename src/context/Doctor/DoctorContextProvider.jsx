import { useState } from "react";
import DoctorContext from "./doctorContext.js";

const DoctorContextProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [doctorAuthenticated, setDoctorAuthenticated] = useState(false);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor, doctorAuthenticated, setDoctorAuthenticated }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
