import React from "react";

const Button = ({ title }) => {
  return (
    <button className="bg-[#5F6FFF] cursor-pointer  text-white px-8 py-3 rounded-full font-light hidden md:block">
      {title}
    </button>
  );
};

export default Button;
