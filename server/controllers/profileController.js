const Profile = require("../models/Profile");

// 1. Controller for getting the user profile
exports.getProfile = async (req, res) => {
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
    const { name, email, contactNum, cnicNumber, address, skill, imgURL } =
      req.body;

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
    });

    // Save user into database
    const savedUser = await newServiceProvider.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};
