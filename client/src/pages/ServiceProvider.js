import React from "react";
import Seller from "../components/Seller";
import ProfileForm from "../components/ProfileForm";
import ShortNav from "../components/ShortNav";

const ServiceProvider = () => {
  return (
    <>
      <ShortNav />
      <section className="flex flex-col">
        <Seller />
        <ProfileForm />
      </section>
    </>
  );
};

export default ServiceProvider;
