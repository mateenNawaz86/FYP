import React from "react";

const OrangeButton = (props) => {
  return (
    <button className="bg-transparent text-[#f44336] border border-[#f44336] hover:text-[#fff] hover:bg-[#f44336] transition-all duration-300 rounded-sm w-fit p-1 px-4">
      {props.children}
    </button>
  );
};

export default OrangeButton;
