const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// 1. Route for sending contact mail to admin
router.post("/contact", contactController.postContact);

module.exports = router;
