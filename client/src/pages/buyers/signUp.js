import React from "react";
import Form from "../../components/Form";
import { Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { MdOutlineArrowRightAlt } from "react-icons/md";

const SignUp = ({ alertHandler }) => {
  const isNonResponsive = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <Box
        width={isNonResponsive ? "50%" : "90%"}
        p="2rem"
        m="5% auto"
        borderRadius="10px"
        backgroundColor="#f6f6f6"
      >
        <div className="flex justify-between ">
          <h1 className="font-medium mb-14 uppercase tracking-wider text-lg text-cyan-500 text-center">
            Welcome to HandyHome
          </h1>

          <Link to="/seller/signIn" className="inline-block">
            <Button variant="contained" endIcon={<MdOutlineArrowRightAlt />}>
              Seller
            </Button>
          </Link>
        </div>
        <Form alertHandler={alertHandler} />
      </Box>
    </>
  );
};
export default SignUp;
