import React from "react";
import About from "../components/About";
import ServiceComp from "../components/ServiceComp";
import ContactUs from "./contact";
import Testimonial from "../components/Testimonial";
import LandingPage from "../components/LandingPage";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <About />
      <ServiceComp />
      <Testimonial />
      <ContactUs />
    </>
  );
};

export default HomePage;
