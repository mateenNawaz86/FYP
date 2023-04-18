import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <About />
      <Services />
      <Reviews />
      <ContactUs />
    </>
  );
};

export default HomePage;
