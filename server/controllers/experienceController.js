const Experience = require("../models/Experience");

// 1. Controller for POST exp
exports.postExperience = async (req, res) => {
  try {
    const { title, date, companyName, description } = req.body;

    // Match requested email with already exists emails
    let experience = await Experience.findOne({ title: title });

    // IF seller already exist return response with 400 status code
    if (experience) {
      return res.status(400).json({
        error: "Experience already exists.",
      });
    }

    const newExp = await Experience.create({
      title: title,
      date: date,
      companyName: companyName,
      description: description,
    });

    const savedNewExp = await newExp.save();
    res.status(201).json(savedNewExp);
  } catch (error) {
    console.log(error);
  }
};

// Controller for GETTING the
exports.getExperience = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID

    const experience = await Experience.find({ user: userId });

    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
