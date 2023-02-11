import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DummyForm = () => {
  const [user, setUser] = useState({ name: "", email: "", pasword: "" });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, email, password } = user;
    const savedUserResponse = await fetch("http://localhost:6000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name, email, password),
    });

    const data = await savedUserResponse.json();
    if (data) {
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          onChange={changeHandler}
          value={user.name}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
        />
        <input
          onChange={changeHandler}
          value={user.email}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          onChange={changeHandler}
          value={user.password}
          type="password"
          name="psw"
          id="psw"
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default DummyForm;
