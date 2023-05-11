import React from "react";
import Seller from "../components/Seller";
import Requirements from "../components/Requirements";

const ServiceProvider = () => {
  return (
    <>
      <section className="flex flex-col">
        <Seller />
        <Requirements />
      </section>
    </>
  );
};

export default ServiceProvider;
