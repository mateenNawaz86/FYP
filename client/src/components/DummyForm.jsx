import React, { useState } from "react";

const DummyForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="name" id="name" placeholder="Name" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input type="password" name="psw" id="psw" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default DummyForm;
