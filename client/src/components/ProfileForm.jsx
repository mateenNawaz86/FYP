import { Button } from "@mui/material";
import React from "react";

const ProfileForm = () => {
  // Function for handling the register of new user
  // const register = async (values, onSubmitProps) => {
  //   // Saved the user info on local storage
  //   let savedUserResponse = await fetch("http://localhost:5000/api/profile", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values),
  //   });

  //   // save the user response
  //   const savedUser = await savedUserResponse.json();
  //   // Reset the form
  //   onSubmitProps.resetForm();
  //   // After Register the user set page type to login

  //   if (savedUser) {
  //     setPageType("login");
  //   }
  // };
  return (
    <>
      <form class="w-11/12 max-w-lg m-auto mt-20">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Mateen"
            />
            {/* <p class="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mt-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="contact-num"
            >
              Contact NO
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="contact-num"
              type="text"
              placeholder="+923326176987"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mt-6 ">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="cnic"
            >
              CNIC
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="cnic"
              type="text"
              placeholder="3220345678123"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Address
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              type="text"
              placeholder="Layyah, Pakistan"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="skill"
            >
              Skill
            </label>
            <div class="relative">
              <input
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="skill"
                placeholder="Plunmber"
              />
            </div>
          </div>
        </div>
        <div class="w-full my-6 md:my-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            Image URL
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="img"
            type="text"
            placeholder="image URL"
          />
        </div>
        <Button
          variant="contained"
          sx={{
            margin: "1rem 0",
          }}
        >
          Create Profile
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;
