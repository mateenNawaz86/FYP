import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const BookingForm = ({ alertHandler }) => {
  const [enteredInput, setEnteredInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    service: "",
    address: "",
    postalCode: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const inputChangeHandler = (event) => {
    setEnteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/service-providers/${id}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          name: enteredInput.name,
          email: enteredInput.email,
          phoneNumber: enteredInput.phoneNumber,
          service: enteredInput.service,
          address: enteredInput.address,
          postalCode: enteredInput.postalCode,
          price: enteredInput.price,
          description: enteredInput.description,
        }),
      }
    );

    const booking = await response.json();
    if (booking) {
      navigate("/seaker/orders");
      alertHandler("Your service has been booked successfully!", "success");
    } else {
      console.log("Error");
      alertHandler("An error occurred while booking the service.", "error");
    }
  };

  const isFormValid = Object.values(enteredInput).every(
    (value) => value.trim() !== ""
  );
  return (
    <>
      <main className="py-8">
        <section className="max-w-eighty m-auto mb-12">
          <h1 className="text-base uppercase underline underline-offset-4 sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-8">
            Book your sevrice
          </h1>
          <form
            onSubmit={formSubmitHandler}
            className="w-11/12 max-w-lg m-auto"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Mateen"
                  value={enteredInput.name}
                  onChange={inputChangeHandler}
                  name="name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={enteredInput.email}
                  onChange={inputChangeHandler}
                  name="email"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mt-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="mobileNumberInput"
                >
                  Phone NO
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="mobileNumberInput"
                  value={enteredInput.phoneNumber}
                  onChange={inputChangeHandler}
                  name="phoneNumber"
                  type="text"
                  placeholder="+923326176987"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mt-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="service"
                >
                  Service
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="service"
                  type="text"
                  placeholder="Electrician"
                  value={enteredInput.service}
                  onChange={inputChangeHandler}
                  name="service"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  placeholder="Layyah, Pakistan"
                  onChange={inputChangeHandler}
                  value={enteredInput.address}
                  name="address"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="skill"
                >
                  Postal Code
                </label>
                <div className="relative">
                  <input
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="skill"
                    placeholder="44000"
                    value={enteredInput.postalCode}
                    onChange={inputChangeHandler}
                    name="postalCode"
                  />
                </div>
              </div>
            </div>
            <div className="w-full my-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="number"
                placeholder="$5-$2000"
                value={enteredInput.price}
                onChange={inputChangeHandler}
                name="price"
              ></input>
            </div>
            <div className="w-full my-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                type="text"
                rows="5"
                placeholder="Please describe your work..."
                value={enteredInput.description}
                onChange={inputChangeHandler}
                name="description"
              ></textarea>
            </div>
            <Button type="submit" variant="contained" disabled={!isFormValid}>
              Booking
            </Button>
          </form>
        </section>
        <hr />
      </main>
    </>
  );
};

export default BookingForm;
