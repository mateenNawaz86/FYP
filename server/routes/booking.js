const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// 1. Route for post the service
router.post("/service-providers/:id/bookings", bookingController.bookService);

// 2. Route for GET the current orders
router.get("/orders", bookingController.getOrders);

// 3. Route for UPDATE the current order
router.put("/orders/:id/status", bookingController.updateOrderStatus);

module.exports = router;
