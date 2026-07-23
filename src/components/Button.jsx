import React from "react";

const Button = ({ title, className }) => {
  return (
    <button
      className={`${className} cursor-pointer px-8 py-3 font-light`}
      type="submit"
    >
      {title}
    </button>
  );
};

export default Button;

// #5F6FFF text-white
