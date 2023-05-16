import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ServiceItem = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  const { img, title, description } = props;
  return (
    <>
      <div className="flex flex-col justify-between items-center mb-12">
        <img src={img} alt={title} className="h-20 w-20" />
        <h2 className="my-4 text-sm sm:text-base md:text-lg text-center font-semibold text-[#212529]">
          {title}
        </h2>
        <p className="text-center text-[#757575] mb-3 md:text-sm">
          {description}
        </p>
        {isAuthenticated && (
          <Link
            to="/service-providers"
            className="bg-[#4280EA] text-white rounded-full py-1 px-4 hover:bg-[#000000] hover:ease-in duration-200"
          >
            Book Now
          </Link>
        )}
      </div>
    </>
  );
};

export default ServiceItem;
