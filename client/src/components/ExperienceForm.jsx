import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ExperienceForm = ({ alertHandler }) => {
  const navigate = useNavigate();
  const [enteredInput, setEnteredInput] = useState({
    title: "",
    start: "",
    end: "",
    companyName: "",
    description: "",
  });

  const inputChangeHandler = (event) => {
    setEnteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    const response = await fetch("http://localhost:5000/api/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: enteredInput.title,
        start: enteredInput.start, // Use extracted month and year
        end: enteredInput.end, // Use extracted month and year
        companyName: enteredInput.companyName,
        description: enteredInput.description,
      }),
    });

    const profile = await response.json();
    if (profile) {
      navigate("/seller/my-services");
      alertHandler("Experience add successfully!", "success");
    } else {
      console.log("Error");
      alertHandler("Something goes wrong..!", "error");
    }
  };

  const isFormValid = Object.values(enteredInput).every(
    (value) => value.trim() !== ""
  );
  return (
    <>
      <main className="py-4 md:py-8">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center">
            fill up your experience
          </h1>

          <form
            onSubmit={formSubmitHandler}
            className="w-11/12 max-w-lg m-auto"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full my-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  placeholder="Title..."
                  value={enteredInput.title}
                  onChange={inputChangeHandler}
                  name="title"
                />
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="start"
                  >
                    Start Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="start"
                    type="text"
                    placeholder="MM-YYYY"
                    value={enteredInput.start}
                    onChange={inputChangeHandler}
                    name="start"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="end"
                  >
                    End Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="end"
                    type="text"
                    placeholder="MM-YYYY"
                    value={enteredInput.end}
                    onChange={inputChangeHandler}
                    name="end"
                  />
                </div>
              </div>

              <div className="w-full my-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="companyName"
                  type="text"
                  placeholder="Apply, Microsoft..."
                  value={enteredInput.companyName}
                  onChange={inputChangeHandler}
                  name="companyName"
                />
              </div>

              <div className="w-full md:my-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Descrption
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  type="text"
                  rows="5"
                  placeholder="Please describe yourelf..."
                  value={enteredInput.description}
                  onChange={inputChangeHandler}
                  name="description"
                ></textarea>
              </div>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  margin: "1rem 0",
                }}
                disabled={!isFormValid}
              >
                Submit
              </Button>
            </div>
          </form>
        </section>
        <hr />
      </main>
    </>
  );
};

export default ExperienceForm;
