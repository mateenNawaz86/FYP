import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/profile" element={<Profile />} exact />
      </Routes>
    </>
  );
};

export default App;
