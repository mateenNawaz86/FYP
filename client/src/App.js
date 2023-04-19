import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import ServiceProvider from "./pages/ServiceProvider";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/profile" element={<ServiceProvider />} exact />
      </Routes>
    </>
  );
};

export default App;
