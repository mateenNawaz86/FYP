const Feedback = require("../models/Feedback");

exports.postFeedback = async (req, res) => {
  try {
    const { sellerId, rating, feedback } = req.body;

    // Create a new feedback instance
    const feedbackObj = new Feedback({
      sellerId,
      rating,
      feedback,
      userId: req.userId, // Assuming you have implemented authentication middleware to get the user ID
    });

    // Save the feedback to the database
    await feedbackObj.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
