import React from "react";
import ContactComp from "../../components/ContactComp";

const Contact = ({ alertHandler }) => {
  return (
    <>
      <ContactComp alertHandler={alertHandler} />
    </>
  );
};

export default Contact;
