import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Formik } from "formik"; // Used for Validation and error messages
import * as yup from "yup"; // JavaScript schema builder for value parsing and validation
import { useNavigate } from "react-router-dom"; // switch to pages
import { useDispatch } from "react-redux"; // action dispatch
import { setLogin } from "../state/userSlice"; //Method of state for log-in setup

// Registor Scehma => Used for how form library saving required INFO
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

// Log-In Schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Inavlid Email").required("required"),
  password: yup.string().required("required"),
});

// Initial values for register
const initialValForRegister = {
  name: "",
  email: "",
  password: "",
};

// Intial values for Log-In
const initialValForLogin = {
  email: "",
  password: "",
};

// Components START here
const Form = () => {
  const [pageType, setPageType] = useState("login"); // state for change the page
  const dispatch = useDispatch(); // Hook for performing some actions
  const navigate = useNavigate(); // Hooks for navigate to another page

  // Variables used for different pages
  const isLogin = pageType === "login"; // IF page type is login
  const isRegister = pageType === "register"; // IF page type is register

  // Function for handling the register of new user
  const register = async (values, onSubmitProps) => {
    // Saved the user info on local storage
    let savedUserResponse = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // save the user response
    const savedUser = await savedUserResponse.json();
    // Reset the form
    onSubmitProps.resetForm();
    // After Register the user set page type to login

    if (savedUser) {
      setPageType("login");
    }
  };

  // Function for control the login page
  const signIn = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID`);
    }

    // Grabe logged-In info
    const user = await response.json();

    // Reset the form
    onSubmitProps.resetForm();

    // After login user navigate to home page
    if (user) {
      dispatch(
        setLogin({
          user: user.user,
          authToken: user.authToken,
        })
      );
      navigate("/");
    }
  };

  // Function working with the help of FORMIK package
  const submitHandler = async (values, onSubmitProps) => {
    if (isLogin) await signIn(values, onSubmitProps);
    console.log(values);
    console.log(JSON.stringify(values));
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={isLogin ? initialValForLogin : initialValForRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {/* Function write like this just bcoz for validation */}
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
                    label="Name" // Show a label up the text field
                    onBlur={handleBlur} // Control the active/Unactive of text field
                    onChange={handleChange} // Control the Inputed data to text field
                    value={values.name} // used for getting values using name attribute
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)} // control error
                    helperText={touched.name && errors.name} // IF text field and error
                    sx={{ gridColumn: "span 4" }} // show two column on lage screen
                  />
                </>
              )}

              <TextField
                label="Email" // Show a label up the text field
                onBlur={handleBlur} // Control the active/Unactive of text field
                onChange={handleChange} // Control the Inputed data to text field
                value={values.email} // used for getting values using name attribute
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)} // control error
                helperText={touched.email && errors.email} // IF text field and error
                sx={{ gridColumn: "span 4" }} // show two column on lage screen
              />
              <TextField
                label="Password" // Show a label up the text field
                type="password" // Hide the password
                onBlur={handleBlur} // Control the active/Unactive of text field
                onChange={handleChange} // Control the Inputed data to text field
                value={values.password} // used for getting values using name attribute
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)} // control error
                helperText={touched.password && errors.password} // IF text field and error
                sx={{ gridColumn: "span 4" }} // show two column on lage screen
              />
            </Box>

            {/* BUTTONS SECTION START */}
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ margin: "10px 0" }}
              >
                {isLogin ? "LOGIN " : "SIGN UP"}
              </Button>
            </Box>
            {/* BUTTONS SECTION END */}

            {/* Typography for switch the pages */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              className="underline text-cyan-700 text-base cursor-pointer hover:text-cyan-900"
            >
              {isLogin
                ? "Don't have an account! Sign Up here"
                : "Already have an account! Login here  "}
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
