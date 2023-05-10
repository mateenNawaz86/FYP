import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import SignUp from "./pages/signUp";
import ServiceProvider from "./pages/serviceProvider";
import Profile from "./pages/profile";
import ContactUs from "./pages/contact";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/service-provider" element={<ServiceProvider />} exact />
        <Route path="/create-profile" element={<Profile />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/contact" element={<ContactUs />} exact />
      </Routes>
    </>
  );
};

export default App;
