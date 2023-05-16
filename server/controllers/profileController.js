const Profile = require("../models/Profile");

// 1. Controller for getting the user profile
exports.getProfiles = async (req, res) => {
  try {
    // Assuming you have a logged-in user ID stored in req.user
    const profile = await Profile.find();

    // Return the profile data
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Controller for posting a new User profile to the database
exports.postProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNum,
      cnicNumber,
      address,
      skill,
      imgURL,
      description,
    } = req.body;

    // Match requested email with already exists emails
    let serviceProvider = await Profile.findOne({ email: email });

    // IF user already exist return response with 400 status code
    if (serviceProvider) {
      return res.status(400).json({
        error: "User already exists with that email address",
      });
    }

    // Create a new user is here
    const newServiceProvider = await Profile.create({
      name: name,
      email: email,
      contactNum: contactNum,
      cnicNumber: cnicNumber,
      address: address,
      skill: skill,
      imgURL: imgURL,
      description: description,
    });

    // Save user into database
    const savedUser = await newServiceProvider.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

// Controller for getting the single product detail
exports.getProfile = async (req, res) => {
  const profileId = req.params.id;

  try {
    // Use the findById method to retrieve the profile by its ID
    const profile = await Profile.findById(profileId);

    // IF profile NOT exist with this specific ID
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Return the profile detail as a JSON response
    res.json(profile);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for getting searched profile
exports.getSearchedProfile = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ message: "Skill parameter is required." });
    }

    // Find profiles by skill using Mongoose
    const filteredProfiles = await Profile.find({ skill });

    res.json(filteredProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
