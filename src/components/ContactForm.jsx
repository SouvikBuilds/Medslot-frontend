import React, { useContext, useState } from "react";
import { Send, X } from "lucide-react";
import formContext from "../context/Form/formContext.js";

const ContactForm = ({}) => {
  const { opened, setOpened, handleOpen } = useContext(formContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.table(name, email, subject, message);
      handleOpen();
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <button
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
          onClick={handleOpen}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="mb-7">
          <h1 className="text-[#5F6FFF] text-2xl sm:text-3xl font-semibold">
            Send us a message
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Have a question or need assistance? Fill out the form and we'll get
            back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5F6FFF] focus:ring-2 focus:ring-[#5F6FFF]/20 transition-all placeholder:text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5F6FFF] focus:ring-2 focus:ring-[#5F6FFF]/20 transition-all placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject
            </label>

            <input
              type="text"
              id="subject"
              placeholder="What is this about?"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5F6FFF] focus:ring-2 focus:ring-[#5F6FFF]/20 transition-all placeholder:text-gray-400"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message
            </label>

            <textarea
              id="message"
              rows="4"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-[#5F6FFF] focus:ring-2 focus:ring-[#5F6FFF]/20 transition-all placeholder:text-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#5F6FFF] text-white py-3 rounded-lg font-medium hover:bg-[#4f5ee8] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
          >
            Send Message
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
