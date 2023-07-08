import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../UI/SearchBar";

const ServiceProList = () => {
  const [data, setData] = useState([]);
  const [skill, setSkill] = useState("");
  const [showNoProfiles, setShowNoProfiles] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const profileHandler = (id) => {
    navigate(`/api/profile-detail/${id}`);
  };

  // API call for search seller
  const searchHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search-profile?skill=${skill}`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();

      setData(jsonData);
      setShowNoProfiles(jsonData.length === 0); // Set state to show "No profiles found" message if the array is empty
    } catch (error) {
      console.error(error);
    }
  };

  const inpGetHandler = (event) => {
    setSkill(event.target.value);
  };

  return (
    <>
      <main className="py-4 md:py-10">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase underline underline-offset-4 sm:text-xl md:text-3xl text-orange-500 font-semibold text-center mb-14">
            Service Providers
          </h1>
          <div className="w-full sm:w-1/2 my-8 ">
            <SearchBar
              category={skill}
              changeHandler={inpGetHandler}
              searchHandler={searchHandler}
            />
          </div>

          {showNoProfiles ? (
            <p className="text-center text-lg text-red-600 font-medium">
              No service providers have registered under the specified category.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center py-10">
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
                        <button
                          onClick={() => profileHandler(item._id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          View Detail
                        </button>
                        <Link
                          to={`/book-service/${item._id}`}
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
          )}
        </section>
        <hr />
      </main>
    </>
  );
};

export default ServiceProList;
