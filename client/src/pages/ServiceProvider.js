import React from "react";
import Seller from "../components/Seller";
import Requirements from "../components/Requirements";
import Footer from "../components/Footer";

const ServiceProvider = () => {
  return (
    <>
      <section className="flex flex-col">
        <Seller />
        <Requirements />
        <Footer />
      </section>
    </>
  );
};

export default ServiceProvider;
