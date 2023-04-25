import React from "react";
import { Link } from "react-router-dom";

const ShortNav = () => {
  return (
    <section className="flex justify-between items-center bg-white h-14 px-4 md:px-8 lg:px-16">
      <Link
        to="/"
        className="text-[#4280EA] font-bold text-lg transition ease-in-out duration-300 hover:text-[#0f48aa] hover:cursor-pointer"
      >
        HandyHome
      </Link>
      <Link to="/" className="hover:text-[#0f48aa]">
        Back to Home
      </Link>
    </section>
  );
};

export default ShortNav;
