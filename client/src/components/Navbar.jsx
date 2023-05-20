import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/userSlice";

import { BsList } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";

import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputBase,
} from "@mui/material";

const Navbar = ({ alertHandler }) => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const showMenuHandler = () => setShowMenu(!showMenu);
  const user = useSelector((state) => state.auth.user);

  const userName = user.slice(0, 6);

  const routeChange = () => {
    navigate("/signup");
  };

  const logoutHandler = () => {
    dispatch(setLogout());
    alertHandler("Logout successfully!", "success");
  };

  return (
    <>
      <div className="flex justify-between items-center border-b-2 bg-white h-14 px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center space-x-3 lg:order-2">
          <p onClick={() => showMenuHandler()}>
            {showMenu ? (
              <IoClose className="text-2xl cursor-pointer lg:hidden" />
            ) : (
              <BsList className="text-2xl cursor-pointer lg:hidden" />
            )}
          </p>
          <VscSearch
            className="text-lg cursor-pointer hidden"
            title="Search Microsoft.com"
          />
        </div>
        <nav className="flex justify-between items-center lg:order-1">
          <Link
            to="/"
            className="text-[#4280EA] font-bold text-xs sm:text-sm md:text-lg transition ease-in-out duration-300 hover:text-[#0f48aa] hover:cursor-pointer"
          >
            HandyHome
          </Link>
          {isAuthenticated && (
            <ul
              className={`lg:flex justify-between items-center absolute left-0 w-full lg:w-auto lg:z-auto lg:space-x-5 lg:bg-white bg-[#f2f2f2] lg:static text-sm transition-all duration-300 ease-in top-14 lg:pb-0 ${
                showMenu ? "left-0 opacity-100" : "left-[-1000px]"
              } lg:opacity-100`}
            >
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/" ? "text-[#E74133]" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/about"
                  className={`${
                    location.pathname === "/about" ? "text-[#E74133]" : ""
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/services"
                  className={`${
                    location.pathname === "/services" ? "text-[#E74133]" : ""
                  }`}
                >
                  Services
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/service-provider"
                  className={` hover:translate-x-2 transition duration-300 ease-in-out ${
                    location.pathname === "/service-provider"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  Become Provider
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0">
                <Link
                  to="/contact"
                  className={`${
                    location.pathname === "/contact" ? "text-[#E74133]" : ""
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          )}
        </nav>

        <div className="flex justify-between items-center md:order-3 space-x-4 text-sm">
          <FlexBetween gap="1rem">
            {isAuthenticated ? (
              <FormControl variant="standard" value={userName}>
                <Select
                  value={userName}
                  sx={{
                    backgroundColor: "#3366C0",
                    width: "auto",
                    borderRadius: "0.25rem",
                    color: "#fff",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      width: "3rem",
                      color: "#fff",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "#3366C0",
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={userName}>
                    <Typography>{userName}</Typography>
                  </MenuItem>

                  <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Button variant="contained" onClick={routeChange}>
                Login
              </Button>
            )}
          </FlexBetween>
        </div>
      </div>
    </>
  );
};

export default Navbar;
