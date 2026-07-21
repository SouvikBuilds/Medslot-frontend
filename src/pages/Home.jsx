import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Specilaity from "../components/Specilaity.jsx";
import DoctorList from "../components/DoctorList.jsx";
import BookAppointmentSection from "../components/BookAppointmentSection.jsx";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col flex-1">
        <Hero />
        <Specilaity />
        <DoctorList />
        <BookAppointmentSection />
      </div>
    </div>
  );
};

export default Home;
