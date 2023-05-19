import React, { useState } from "react";

const ForgotPsw = () => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    // Send the forgot password request to the backend API
    fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Display success message or handle errors
      })
      .catch((error) => {
        console.error(error);
        // Display error message
      });
  };

  const inpChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight text-center tracking-tight text-blue-500 md:text-2xl">
              Forgot Password
            </h2>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={inpChangeHandler}
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPsw;
