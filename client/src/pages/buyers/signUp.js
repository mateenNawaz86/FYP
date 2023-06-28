import React from "react";
import Form from "../../components/Form";
import { Box, useMediaQuery } from "@mui/material";

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
        <div className="flex justify-between flex-col mb-10">
          <h1 className="font-semibold uppercase tracking-wider text-xs sm:text-xl text-cyan-500 text-center">
            Welcome to HandyHome
          </h1>
        </div>
        <Form alertHandler={alertHandler} />
      </Box>
    </>
  );
};
export default SignUp;
