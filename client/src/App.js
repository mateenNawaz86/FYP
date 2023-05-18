import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import SignUp from "./pages/signUp";
import ServiceProvider from "./pages/serviceProvider";
import ProfileCreation from "./pages/profile";
import Booking from "./pages/booking";
import ContactUs from "./pages/contact";
import Navbar from "./components/Navbar";
import BackToTopButton from "./UI/BackToTopButton";
import Footer from "./components/Footer";
import ServiceProList from "./components/ServiceProList";
import Profile from "./components/Profile";
import ResetPsw from "./components/ResetPsw";

const App = () => {
  return (
    <>
      <Navbar />
      <BackToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/reset-password" element={<ResetPsw />} exact />
        <Route path="/service-provider" element={<ServiceProvider />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/contact" element={<ContactUs />} exact />
        <Route path="/service-providers" element={<ServiceProList />} exact />
        <Route path="/create-profile" element={<ProfileCreation />} exact />
        <Route path="/book-service" element={<Booking />} exact />
        <Route path="/api/profile-detail/:id" element={<Profile />} exact />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
