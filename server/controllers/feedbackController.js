const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");

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

// controller for getting the feedback
exports.getFeedback = async (req, res) => {
  try {
    const sellerId = req.query.sellerId; // Access sellerId from query parameters

    const feedback = await Feedback.aggregate([
      {
        $match: { sellerId: mongoose.Types.ObjectId(sellerId) },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual name of the User collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          feedback: 1,
          rating: 1,
          userName: { $arrayElemAt: ["$user.name", 0] },
          imgURL: { $arrayElemAt: ["$user.imgURL", 0] }, // Add imgURL field
          date: 1, // Include the date field
        },
      },
    ]);

    res.status(200).json({ feedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
