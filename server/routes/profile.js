const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const bookingController = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const { validateUser, validate } = require("../middleware/profileValidator");

// 1. Route for getting the user profile
router.get("/profile", profileController.getProfiles);

// 2. Route for creating a service provider profile
router.post(
  "/create-profile",
  validateUser,
  validate,
  profileController.postProfile
);

// 3. Route for sign in seller profile
router.post("/seller-signIn", profileController.signSeller);

// POST route for initiating password reset for sellers
router.post("/seller/forgot-password", profileController.forgotPsw);

// POST route for changing password through reset token for sellers
router.post("/seller/reset-password/:token", profileController.postResetPsw);

// 4. Route for getting the single profile detail
router.get("/profile-detail/:id", profileController.getProfileDetail);

// 5. Route for search a profile with skill
router.get("/search-profile", profileController.getSearchedProfile);

// 6. Route for GET profile
router.get("/profile-detail", authMiddleware, profileController.getProfile);

// 7. Route for GET the orders
router.get("/seller-orders", authMiddleware, profileController.getOrders);

// 8. Route for UPDATE the current order
router.put("/seller-orders/:id/status", bookingController.updateOrderStatus);

// 9. Route for Update the seller profile
router.put(
  "/update-profile",
  validateUser,
  validate,
  authMiddleware,
  profileController.updateProfile
);

// 10. Route for GET earnings
router.get("/seller-earnings", authMiddleware, profileController.getEarnings);

module.exports = router;
