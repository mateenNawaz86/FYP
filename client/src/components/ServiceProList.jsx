import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceProList = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/profile", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }); // Replace with your API endpoint
  //     if (response.ok) {
  //       const data = await response.json();
  //       setData(data.profile);
  //     } else {
  //       const error = await response.json();
  //       throw new Error(error.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <main className="py-4 md:py-10">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase underline underline-offset-4 sm:text-xl md:text-3xl text-orange-500 font-semibold text-center mb-14">
            Service Providers
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.map((item) => {
              return (
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span className="sr-only">Open dropdown</span>
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                          <Link
                            to="/edit-profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/delete"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={item.imgURL}
                      alt="Bonnie"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.skill}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <Link
                        to="/user-detail"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        View Detail
                      </Link>
                      <Link
                        to="/book-service"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      >
                        Booking
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <hr />
      </main>
    </>
  );
};

export default ServiceProList;
