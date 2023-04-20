import React from "react";
import Seller from "../components/Seller";
import ProfileForm from "../components/ProfileForm";
import ShortNav from "../components/ShortNav";
import Requirements from "../components/Requirements";
import Footer from "../components/Footer";

const ServiceProvider = () => {
  return (
    <>
      <ShortNav />
      <section className="flex flex-col">
        <Seller />
        <Requirements />
        <Footer />
      </section>
    </>
  );
};

export default ServiceProvider;
