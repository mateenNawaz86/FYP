import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPsw = ({ alertHandler, userType }) => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Determine the API endpoint based on the user type
    const endpoint =
      userType === "user"
        ? `http://localhost:5000/api/user/reset-password/${token}` // User endpoint
        : `http://localhost:5000/api/seller/reset-password/${token}`; // Seller endpoint

    // Send the reset password request to the backend API
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json())
      .then((data) => {
        alertHandler("Password has been changed successfully!", "success");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alertHandler("Error Occurred!", "error");
      });
  };

  const inpChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight text-center tracking-tight text-blue-500 md:text-2xl">
              Reset Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="*******"
                  required
                  value={password}
                  onChange={inpChangeHandler}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPsw;
