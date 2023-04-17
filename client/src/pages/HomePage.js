import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import Reviews from "./Reviews";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <About />
      <Services />
      <Reviews />
    </>
  );
};

export default HomePage;
