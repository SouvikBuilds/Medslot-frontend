import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets_frontend/assets";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm.jsx";
import { useContext } from "react";
import formContext from "../context/Form/formContext.js";

const Contact = () => {
  const { opened, setOpened, handleOpen } = useContext(formContext);

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-90" src={assets.contact_image} alt="" />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>

          <p className="text-gray-500">
            00000 Willms Station <br />
            Suite 000, Washington, USA
          </p>

          <p className="text-gray-500">
            Tel: (000) 000-0000 <br />
            Email: medslot@gmail.com
          </p>

          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT MEDSLOT
          </p>

          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <div onClick={handleOpen}>
            <Button
              title={"Send a message"}
              className={
                "bg-white active:bg-black border-2 border-gray-900 text-black active:text-white transition-all duration-300"
              }
            />
          </div>

          {opened && (
            <div className="mt-4">
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
