import React from "react";
import Button from "./Button";

const ServiceItem = (props) => {
  const { img, title, description, btnText } = props;
  return (
    <>
      <div className="flex flex-col justify-between items-center mb-12">
        <img src={img} alt={title} className="h-20 w-20" />
        <h2 className="my-4 text-lg font-semibold text-[#212529]">{title}</h2>
        <p className="text-center text-[#757575] mb-3 md:text-sm">{description}</p>
        <Button>Book Now</Button>
      </div>
    </>
  );
};

export default ServiceItem;
