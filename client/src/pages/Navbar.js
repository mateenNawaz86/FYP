import React from "react";
import { Link } from "react-router-dom";
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
import { setLogout } from "../state";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.authToken);
  const fullName = "Mateen";
  const routeChange = () => {
    let path = "/signup";
    navigate(path);
  };
  return (
    <>
      <FlexBetween padding="1rem 5%" backgroundColor="#fff">
        <h2 className="text-[#4280EA] font-bold text-lg transition ease-in-out duration-300 hover:text-[#0f48aa] hover:cursor-pointer">
          HandyHome
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
            About Us
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
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
