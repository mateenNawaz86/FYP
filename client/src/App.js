import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

import SeakerHomePage from "./pages/buyers/seakerHome";
import SellerHome from "./pages/seller/sellerHome";
import About from "./pages/buyers/about";
import Services from "./pages/buyers/services";
import SignUp from "./pages/buyers/signUp";
import ServiceProvider from "./pages/seller/serviceProvider";
import ProfileCreation from "./pages/seller/profile";
import Booking from "./pages/buyers/booking";
import ContactUs from "./pages/buyers/contact";
import Navbar from "./components/Navbar";
import BackToTopButton from "./UI/BackToTopButton";
import Footer from "./components/Footer";
import ServiceProList from "./components/ServiceProList";
import Profile from "./components/Profile";
import ForgotPsw from "./components/ForgotPsw";
import ResetPsw from "./components/ResetPsw";
import AlertComp from "./UI/AlertComp";
import SellerSignIn from "./components/SellerSignIn";
import SellerNav from "./components/SellerNav";
import MyProfile from "./pages/seller/myProfile";
import DashBoard from "./pages/buyers/dashBoard";

const App = () => {
  const [showAlert, setShowAlert] = useState(null);
  // const userRole = useSelector((state) => state.profile.userRole);

  const showAlertHandler = (messsage, alertType) => {
    setShowAlert({
      msg: messsage,
      type: alertType,
    });
    setTimeout(() => setShowAlert(null), 2000); // Hide the alert after 3 seconds
  };

  const location = useLocation();
  const isSellerDashboard = location.pathname.includes("seller-home");

  return (
    <>
      {isSellerDashboard ? (
        <SellerNav alertHandler={showAlertHandler} />
      ) : (
        <Navbar alertHandler={showAlertHandler} />
      )}

      <div className="h-12 bg-[#fff]">
        <AlertComp alert={showAlert} />
      </div>
      <Routes>
        <Route
          path="/"
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

        <Route path="/seller-home" element={<SellerHome />} exact />
        <Route path="/service-seaker" element={<SeakerHomePage />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/seaker-orders" element={<DashBoard />} exact />

        <Route
          path="/contact"
          element={<ContactUs alertHandler={showAlertHandler} />}
          exact
        />

        <Route
          path="/seller-signIn"
          element={<SellerSignIn />}
          alertHandler={showAlertHandler}
          exact
        />

        <Route
          path="/create-profile"
          element={<ProfileCreation alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/my-profile" element={<MyProfile />} exact />
        <Route path="/service-providers" element={<ServiceProList />} exact />
        <Route path="/api/profile-detail/:id" element={<Profile />} exact />
        <Route path="/service-provider" element={<ServiceProvider />} exact />
        <Route path="/service-providers" element={<ServiceProList />} exact />
        <Route
          path="/book-service"
          element={<Booking alertHandler={showAlertHandler} />}
          exact
        />
      </Routes>

      <BackToTopButton />
      <Footer />
    </>
  );
};

export default App;
