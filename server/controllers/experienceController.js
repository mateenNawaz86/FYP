const Experience = require("../models/Experience");

// Controller for POST experience
exports.postExperience = async (req, res) => {
  try {
    const { title, start, end, companyName, description } = req.body;

    // Check if experience with the same title already exists
    let experience = await Experience.findOne({ title });

    // If experience already exists, return a response with a 400 status code
    if (experience) {
      return res.status(400).json({
        error: "Experience already exists.",
      });
    }

    // Get the logged-in user's ID
    const userId = req.user.id;

    const newExp = new Experience({
      title,
      start,
      end,
      companyName,
      description,
      user: userId, // Associate the booking with the logged-in user
    });

    const savedNewExp = await newExp.save();
    res.status(201).json(savedNewExp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller for GETTING experiences
exports.getExperience = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID

    const experiences = await Experience.find({ user: userId });

    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
