import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import ContactUs from "./ContactUs";
import Footer from "../components/Footer";
import ServiceProvider from "./ServiceProvider";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <About />
      <Services />
      <ServiceProvider />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
