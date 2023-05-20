import React from "react";
import BookingForm from "../components/BookingForm";

const booking = ({ alertHandler }) => {
  return (
    <>
      <BookingForm alertHandler={alertHandler} />
    </>
  );
};

export default booking;
