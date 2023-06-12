const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

// 1. Route for posting the feedback
router.post("/feedback", authMiddleware, feedbackController.postFeedback);

// 2. Route for getting the feedback
router.get("/feedback", authMiddleware, feedbackController.getFeedback);

module.exports = router;
