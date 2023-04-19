import React from "react";

const BlueButton = (props) => {
  return (
    <button className="bg-[#4280EA] text-white rounded-full py-1 px-4 hover:bg-[#000000] hover:ease-in duration-200">
      {props.children}
    </button>
  );
};

export default BlueButton;
