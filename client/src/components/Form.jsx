import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../state/userSlice";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValForRegister = {
  name: "",
  email: "",
  password: "",
  imgURL: "",
};

const initialValForLogin = {
  email: "",
  password: "",
};

const Form = ({ alertHandler }) => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    let savedUserResponse = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const savedUser = await savedUserResponse.json();
    alertHandler("Registration successful!", "success");

    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const signInHandler = async (values) => {
    try {
      const response = await dispatch(signin(values));
      if (response.payload) {
        alertHandler("Sign in successfully!", "success");
        navigate("/service-seeker");
      } else {
        alertHandler("Please enter the correct credentials!", "error");
      }
    } catch (error) {
      console.log(error);
      alertHandler("An error occurred. Please try again later.", "error");
    }
  };

  const submitHandler = async (values, onSubmitProps) => {
    if (isLogin) signInHandler(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={isLogin ? initialValForLogin : initialValForRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              {isRegister && (
                <>
                  <TextField
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="ImgURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.imgURL}
                    name="imgURL"
                    error={Boolean(touched.imgURL) && Boolean(errors.imgURL)}
                    helperText={touched.mgURL && errors.imgURL}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <div className="flex justify-between items-center">
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "10px 0" }}
                >
                  {isLogin ? "LOGIN" : "SIGN UP"}
                </Button>
              </Box>

              <Link
                to="/user/forgot-password"
                className="underline text-cyan-700 text-base cursor-pointer hover:text-cyan-900"
              >
                Forgot Password
              </Link>
            </div>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              className="underline text-cyan-700 text-base cursor-pointer hover:text-cyan-900"
            >
              {isLogin
                ? "Don't have an account? Sign Up here"
                : "Already have an account? Login here"}
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
