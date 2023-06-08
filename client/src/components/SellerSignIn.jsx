import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { sellerSignIn } from "../state/profileSlice";

const SellerSignIn = ({ alertHandler }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredInp, setEnteredInp] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    setEnteredInp({
      ...enteredInp,
      [event.target.name]: event.target.value,
    });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(sellerSignIn(enteredInp));
      if (response.payload) {
        alertHandler("Sign in successfully!", "success");
        navigate("/seller");
      } else {
        alertHandler("Please enter the correct credentials!", "error");
      }
    } catch (error) {
      console.log(error);
      alertHandler("An error occurred. Please try again later.", "error");
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center h-fit py-12">
        <div className="w-4/5 p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-purple-600 lg:max-w-xl">
          <h1 className="text-xl sm:text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
            Sign in
          </h1>
          <form className="mt-6" onSubmit={signInHandler}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={enteredInp.email}
                onChange={inputChangeHandler}
                placeholder="Enter Email..."
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={enteredInp.password}
                onChange={inputChangeHandler}
                placeholder="Enter Password..."
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <Link
              to="/reset-password"
              className="text-xs text-purple-600 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full sm:w-fit px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?
            <Link
              to="/create-profile"
              className="font-medium text-purple-600 hover:underline ml-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SellerSignIn;
