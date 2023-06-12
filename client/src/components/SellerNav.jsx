import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/profileSlice";

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

const SellerNav = ({ alertHandler }) => {
  const isAuthenticated = useSelector((state) => state.profile.token);
  const user = useSelector((state) => state.profile.user);

  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const showMenuHandler = () => setShowMenu(!showMenu);

  const sellerName = user.slice(0, 6);

  const routeChange = () => {
    navigate("/seller/signIn");
  };
  const buyerChangeHandler = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(setLogout());
    navigate("/");
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
            to={isAuthenticated ? "/seller" : "/seller/signIn"}
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
                  to="/seller/my-profile"
                  className={`${
                    location.pathname === "/seller/my-profile"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/seller/my-services"
                  className={`${
                    location.pathname === "/seller/my-services"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  My Services
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0 lg:ml-6 border-b-2 border-[#e7e7e7] lg:border-b-0">
                <Link
                  to="/seller/orders"
                  className={`${
                    location.pathname === "/seller/orders"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  orders
                </Link>
              </li>

              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0">
                <Link
                  to="/seller/reviews"
                  className={`${
                    location.pathname === "/seller/reviews"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  Reviews
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#ec5446] py-3 px-6 lg:py-0 lg:px-0">
                <Link
                  to="/seller/earnings"
                  className={`${
                    location.pathname === "/seller/earnings"
                      ? "text-[#E74133]"
                      : ""
                  }`}
                >
                  Earnings
                </Link>
              </li>
            </ul>
          )}
        </nav>

        <div className="flex justify-between items-center md:order-3 space-x-4 text-sm">
          <FlexBetween gap="1rem">
            {isAuthenticated ? (
              <FormControl variant="standard" value={sellerName}>
                <Select
                  value={sellerName}
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
                  <MenuItem value={sellerName}>
                    <Typography>{sellerName}</Typography>
                  </MenuItem>

                  <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <>
                <Button variant="contained" onClick={buyerChangeHandler}>
                  Back to Buyer
                </Button>
                <Button variant="contained" onClick={routeChange}>
                  Login
                </Button>
              </>
            )}
          </FlexBetween>
        </div>
      </div>
    </>
  );
};

export default SellerNav;
