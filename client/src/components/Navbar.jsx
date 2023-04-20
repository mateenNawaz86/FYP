import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsList } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import FlexBetween from "../components/FlexBetween";
import Button from "@mui/material/Button";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputBase,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/userSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showMenuHandler = () => setShowMenu(!showMenu);
  const isAuth = useSelector((state) => state.user.authToken);
  const fullName = "Mateen";
  const routeChange = () => {
    let path = "/signup";
    navigate(path);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white h-14 px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center space-x-3 md:order-2">
          <p onClick={() => showMenuHandler()}>
            {showMenu ? (
              <IoClose className="text-2xl cursor-pointer md:hidden" />
            ) : (
              <BsList className="text-2xl cursor-pointer md:hidden" />
            )}
          </p>
          <VscSearch
            className="text-xl cursor-pointer md:hidden"
            title="Search Microsoft.com"
          />
        </div>
        <nav className="flex justify-between items-center md:order-1">
          <h2 className="text-[#4280EA] font-bold text-lg transition ease-in-out duration-300 hover:text-[#0f48aa] hover:cursor-pointer">
            HandyHome
          </h2>
          <ul
            className={`md:flex justify-between items-center absolute left-0 w-full md:w-auto md:z-auto md:space-x-5 md:bg-white bg-[#f2f2f2]  md:static text-sm  transition-all duration-300 ease-in pb-6 top-12 md:pb-0 ${
              showMenu ? "left-0 opacity-100" : "left-[-800px]"
            } md:opacity-100`}
          >
            <li className="cursor-pointer py-3 px-6 md:py-0 md:px-0 md:ml-6 border-b-2 border-[#e7e7e7] md:border-b-0">
              <Link to="#" className="hover:text-[#0f48aa]">
                Home
              </Link>
            </li>
            <li className="cursor-pointer py-3 px-6 md:py-0 md:px-0 border-b-2 border-[#e7e7e7] md:border-b-0">
              <Link to="#about" className="hover:text-[#0f48aa]">
                About Us
              </Link>
            </li>
            <li className="cursor-pointer py-3 px-6 md:py-0 md:px-0 border-b-2 border-[#e7e7e7] md:border-b-0">
              <Link to="#services" className="hover:text-[#0f48aa]">
                Services
              </Link>
            </li>
            <li className="cursor-pointer py-3 px-6 md:py-0 md:px-0 border-b-2 border-[#e7e7e7] md:border-b-0">
              <Link to="/service-provider" className="hover:text-[#0f48aa]">
                Become Provider
              </Link>
            </li>
            <li className="cursor-pointer py-3 px-6 md:py-0 md:px-0">
              <Link to="#contact" className="hover:text-[#0f48aa]">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex justify-between items-center md:order-3 space-x-4 text-sm">
          <FlexBetween gap="1rem">
            <Button variant="contained" onClick={routeChange}>
              Login
            </Button>
            {isAuth && (
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: "#3366C0",
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "#3366C0",
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </FlexBetween>
        </div>
      </div>
    </>
  );
};

export default Navbar;
