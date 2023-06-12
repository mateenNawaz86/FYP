import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

import SeakerHomePage from "./pages/buyers/seakerHome";
import SellerHome from "./pages/seller/sellerHome";
import About from "./pages/buyers/about";
import Services from "./pages/buyers/services";
import SignUp from "./pages/buyers/signUp";
import ProfileCreation from "./pages/seller/profile";
import Booking from "./components/BookingForm";
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
import FeedbackComp from "./components/FeedbackComp";
import ExperienceForm from "./components/ExperienceForm";
import Experiences from "./components/Experiences";
import Orders from "./pages/seller/orders";
import ProfileForm from "./components/ProfileForm";
import SellerEarnings from "./components/SellerEarnings";
import Feedbacks from "./components/Feedbacks";

const App = () => {
  const [showAlert, setShowAlert] = useState(null);

  const showAlertHandler = (messsage, alertType) => {
    setShowAlert({
      msg: messsage,
      type: alertType,
    });
    setTimeout(() => setShowAlert(null), 2000); // Hide the alert after 3 seconds
  };

  const location = useLocation();
  const isSellerDashboard = location.pathname.includes("seller");

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

        {/* user routes */}
        <Route
          path="/user/forgot-password"
          element={
            <ForgotPsw userType="user" alertHandler={showAlertHandler} />
          }
          exact
        />
        <Route
          path="/user/reset-password/:token"
          element={<ResetPsw userType="user" alertHandler={showAlertHandler} />}
          exact
        />

        {/* Seller routes */}
        <Route
          path="/seller/forgot-password"
          element={
            <ForgotPsw userType="seller" alertHandler={showAlertHandler} />
          }
          exact
        />
        <Route
          path="/seller/reset-password/:token"
          element={
            <ResetPsw userType="seller" alertHandler={showAlertHandler} />
          }
          exact
        />

        <Route path="/service-seeker" element={<SeakerHomePage />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/services" element={<Services />} exact />
        <Route path="/service-providers" element={<ServiceProList />} exact />
        <Route path="/seaker/orders" element={<DashBoard />} exact />
        <Route
          path="/feedback/:sellerId"
          element={<FeedbackComp alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/api/profile-detail/:id" element={<Profile />} exact />
        <Route
          path="/book-service/:id"
          element={<Booking alertHandler={showAlertHandler} />}
          exact
        />
        <Route
          path="/contact"
          element={<ContactUs alertHandler={showAlertHandler} />}
          exact
        />

        <Route
          path="/seller/create-profile"
          element={<ProfileCreation alertHandler={showAlertHandler} />}
          exact
        />
        <Route
          path="/seller/signIn"
          element={<SellerSignIn alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/seller" element={<SellerHome />} exact />
        <Route path="/seller/my-profile" element={<MyProfile />} exact />
        <Route
          path="/seller/experience/:token"
          element={<ExperienceForm alertHandler={showAlertHandler} />}
          exact
        />
        <Route path="/seller/my-services" element={<Experiences />} exact />
        <Route path="/seller/orders" element={<Orders />} exact />
        <Route path="/update-profile" element={<ProfileForm />} exact />
        <Route path="/seller/reviews" element={<Feedbacks />} exact />
        <Route path="/seller/earnings" element={<SellerEarnings />} exact />
      </Routes>

      <BackToTopButton />
      <Footer />
    </>
  );
};

export default App;
