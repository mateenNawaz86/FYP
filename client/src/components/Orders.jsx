import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <>
      
      <div className="flex justify-between flex-col sm:flex-row py-4 px-6 bg-[#f6f6f6] rounded shadow-md w-full">
        <img src="" alt="" className="hidden sm:block" />
        <p>price</p>
        <p>time</p>
        <p>progress</p>
        <Link to="/">view</Link>
      </div>
    </>
  );
};

export default Orders;
