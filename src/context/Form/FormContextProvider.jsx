import React, { useState } from "react";
import formContext from "./formContext.js";

const FormContextProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened((prev) => !prev);
  };
  return (
    <formContext.Provider value={{ opened, setOpened, handleOpen }}>
      {children}
    </formContext.Provider>
  );
};

export default FormContextProvider;
