import React from "react";

const SellerItem = (props) => {
  const { img, title, description } = props;
  return (
    <>
      <div className="flex flex-col justify-between items-center mb-12">
        <img src={img} alt={title} className="h-20 w-20" />
        <h2 className="my-4 text-lg font-semibold text-center text-[#212529]">{title}</h2>
        <p className="text-center text-[#757575] mb-3 md:text-sm">
          {description}
        </p>
      </div>
    </>
  );
};

export default SellerItem;
