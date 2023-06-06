import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const ProfileForm = ({ alertHandler }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.profile.token);

  const [enteredInput, setEnteredInput] = useState({
    name: "",
    email: "",
    password: "",
    contactNum: "",
    cnicNumber: "",
    address: "",
    skill: "",
    imgURL: "",
    description: "",
  });

  useEffect(() => {
    if (location.state && location.state.profileData) {
      const profileData = location.state.profileData;
      setEnteredInput({
        name: profileData.name,
        email: profileData.email,
        password: profileData.password,
        contactNum: profileData.contactNum,
        cnicNumber: profileData.cnicNumber,
        address: profileData.address,
        skill: profileData.skill,
        imgURL: profileData.imgURL,
        description: profileData.description,
      });
    }
  }, [location.state]);

  const inputChangeHandler = (event) => {
    setEnteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    let apiUrl = "";
    let method = "";

    if (location.state && location.state.profileData) {
      // Updating existing profile
      apiUrl = "http://localhost:5000/api/update-profile";
      method = "PUT";
    } else {
      // Creating a new profile
      apiUrl = "http://localhost:5000/api/create-profile";
      method = "POST";
    }

    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(enteredInput),
    });

    const updatedProfile = await response.json();
    if (updatedProfile) {
      if (method === "POST") {
        navigate("/seller-signIn");
        alertHandler("Profile created successfully!", "success");
      } else {
        navigate("/seller/my-profile");
        alertHandler("Profile updated successfully!", "success");
      }
    } else {
      console.log("Error");
      alertHandler("Something went wrong..!", "error");
    }
  };

  const isFormValid = Object.values(enteredInput).every(
    (value) => value.trim() !== ""
  );

  return (
    <>
      <main className="py-8">
        <section className="max-w-eighty m-auto mb-12">
          <h1 className="text-base uppercase underline underline-offset-4 sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-14">
            {location.state && location.state.profileData
              ? "Update your profile"
              : "Create your profile"}
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
                  Contact NO
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="mobileNumberInput"
                  value={enteredInput.contactNum}
                  onChange={inputChangeHandler}
                  name="contactNum"
                  type="text"
                  placeholder="+923326176987"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mt-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="cnic"
                >
                  CNIC
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="cnic"
                  type="text"
                  placeholder="32203-6452314-9"
                  value={enteredInput.cnicNumber}
                  onChange={inputChangeHandler}
                  name="cnicNumber"
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
                  Skill
                </label>
                <div className="relative">
                  <input
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="skill"
                    placeholder="Plunmber"
                    value={enteredInput.skill}
                    onChange={inputChangeHandler}
                    name="skill"
                  />
                </div>
              </div>
            </div>
            <div className="w-full my-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                placeholder="password"
                value={enteredInput.password}
                onChange={inputChangeHandler}
                name="password"
              />
            </div>
            <div className="w-full my-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="img"
              >
                Image URL
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="img"
                type="text"
                placeholder="image URL"
                value={enteredInput.imgURL}
                onChange={inputChangeHandler}
                name="imgURL"
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
              {location.state && location.state.profileData
                ? "Update Profile"
                : "Create Profile"}
            </Button>
          </form>
        </section>
        <hr />
      </main>
    </>
  );
};

export default ProfileForm;
