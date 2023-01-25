import React from "react";
import Form from "../components/Form";
import { Box, useMediaQuery } from "@mui/material";
import DummyForm from "../components/DummyForm";

const SignUp = () => {
  const isNonResponsive = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      width={isNonResponsive ? "50%" : "90%"}
      p="2rem"
      m="5% auto"
      borderRadius="10px"
      backgroundColor="#fff"
    >
      <h1 className="font-medium mb-6 uppercase tracking-wider text-lg text-cyan-500 text-center">
        Welcome to WBHSP
      </h1>
      <Form />
      {/* <DummyForm /> */}
    </Box>
  );
};
export default SignUp;
