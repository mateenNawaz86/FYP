import React from "react";
import About from "../components/About";
import ServiceComp from "../components/ServiceComp";
import ContactUs from "./contact";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
const HomePage = () => {
  return (
    <>
      <About />
      <ServiceComp />
      <Testimonial />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
