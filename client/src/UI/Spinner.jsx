import React from "react";
import spinner from "../assets/loading.gif";

const Spinner = () => {
  return (
    <>
      <div className="text-center">
        <img className="my-3" src={spinner} alt="Loading Spinner" />
      </div>
    </>
  );
};

export default Spinner;
