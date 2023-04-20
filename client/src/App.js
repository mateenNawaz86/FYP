import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import ServiceProvider from "./pages/ServiceProvider";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/service-provider" element={<ServiceProvider />} exact />
        <Route path="/create-profile" element={<Profile />} exact />
      </Routes>
    </>
  );
};

export default App;
