import React, { useState } from "react";
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
import ForgotPsw from "./components/ForgotPsw";
import ResetPsw from "./components/ResetPsw";
import AlertComp from "./UI/AlertComp";

const App = () => {
  const [showAlert, setShowAlert] = useState(null);

  const showAlertHandler = (messsage, alertType) => {
    setShowAlert({
      msg: messsage,
      type: alertType,
    });
    setTimeout(() => setShowAlert(null), 2000); // Hide the alert after 3 seconds
  };
  return (
    <>
      <Navbar alertHandler={showAlertHandler} />
      <div className="h-12 bg-[#F6F6F6]">
        <AlertComp alert={showAlert} />
      </div>
      <BackToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route
          path="/signup"
          element={<SignUp alertHandler={showAlertHandler} />}
          exact
        />
        <Route
          path="/reset-password"
          element={<ForgotPsw alertHandler={showAlertHandler} />}
          exact
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPsw alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/service-provider" element={<ServiceProvider />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route
          path="/contact"
          element={<ContactUs alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/service-providers" element={<ServiceProList />} exact />
        <Route
          path="/create-profile"
          element={<ProfileCreation alertHandler={showAlertHandler} />}
          exact
        />
        <Route
          path="/book-service"
          element={<Booking alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/api/profile-detail/:id" element={<Profile />} exact />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
