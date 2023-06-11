import React, { useState } from "react";

const ForgotPsw = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();

    // Determine the API endpoint based on the user type
    const endpoint =
      userType === "user"
        ? "http://localhost:5000/api/user/forgot-password" // User endpoint
        : "http://localhost:5000/api/seller/forgot-password"; // Seller endpoint

    try {
      // Send the forgot password request to the backend API
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Password reset email sent successfully
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Input change handler
  const inpChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <section className="bg-[#fff]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-fit lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight text-center tracking-tight text-blue-500 md:text-2xl">
              Forgot Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={inpChangeHandler}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Email
              </button>

              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPsw;
