const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// 1. Route for post the service
router.post("/book-service", bookingController.bookService);

module.exports = router;
