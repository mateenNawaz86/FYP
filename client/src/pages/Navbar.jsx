import React from "react";
import FlexBetween from "../components/FlexBetween";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <>
      <FlexBetween padding="1rem 5%" backgroundColor="#F4F5F7">
        <h2 className="text-[#4280EA] font-bold text-lg transition ease-in-out duration-300 hover:text-[#0f48aa] hover:cursor-pointer">
          WBHSP
        </h2>
        <FlexBetween gap="2rem">
          <Link
            className="text-[#000] hover:text-[#4280EA] text-base font-semibold"
            to="/home"
          >
            Home
          </Link>
          <Link
            className="text-[#000] hover:text-[#4280EA] text-base font-semibold"
            to="/about"
          >
            About
          </Link>
          <Link
            className=" text-[#000] hover:text-[#4280EA] text-base font-semibold"
            to="/services"
          >
            Services
          </Link>
          <Link
            to="become-provider"
            className="text-[#000] hover:text-[#4280EA] text-base font-semibold"
          >
            Become Provider
          </Link>
          <Link
            className="text-[#000] hover:text-[#4280EA] text-base font-semibold"
            to="/contact-us"
          >
            Contact Us
          </Link>
          <FlexBetween gap="1rem">
            <Button variant="contained">Login</Button>
            <Button variant="contained">Register</Button>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
