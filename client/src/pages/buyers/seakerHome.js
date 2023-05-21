import React from "react";
import About from "../../components/About";
import ServiceComp from "../../components/ServiceComp";
import ContactUs from "./contact";
import Testimonial from "../../components/Testimonial";
import LandingPage from "../../components/LandingPage";
import Working from "../../components/Working";

const seakerHome = () => {
  return (
    <>
      <LandingPage />
      <About />
      <ServiceComp />
      <Working />
      <Testimonial />
      <ContactUs />
    </>
  );
};

export default seakerHome;
