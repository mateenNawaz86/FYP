const Profile = require("../models/Profile");
const BookService = require("../models/Booking");

const bcrypt = require("bcryptjs"); // used for hash password
const jwt = require("jsonwebtoken"); // used for generate JWT_token
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// 1. Controller for getting the seller profile
exports.getProfiles = async (req, res) => {
  try {
    // Assuming you have a logged-in seller ID stored in req.seller
    const profile = await Profile.find();

    // Return the profile data
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Controller for posting a new seller profile to the database
exports.postProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contactNum,
      cnicNumber,
      address,
      skill,
      imgURL,
      description,
    } = req.body;

    // Match requested email with already exists emails
    let serviceProvider = await Profile.findOne({ email: email });

    // IF seller already exist return response with 400 status code
    if (serviceProvider) {
      return res.status(400).json({
        error: "seller already exists with that email address",
      });
    }

    // Create a password hash and add salt to the password
    const salt = await bcrypt.genSalt(10);
    const secPsw = await bcrypt.hash(password, salt);

    // Create a new seller profile is here
    const newServiceProvider = await Profile.create({
      name: name,
      email: email,
      password: secPsw,
      contactNum: contactNum,
      cnicNumber: cnicNumber,
      address: address,
      skill: skill,
      imgURL: imgURL,
      description: description,
    });

    // Save seller into database
    const savedSeller = await newServiceProvider.save();
    res.status(201).json(savedSeller);
  } catch (error) {
    console.log(error);
  }
};

exports.signSeller = async (req, res) => {
  try {
    // Getting Email, Password from request body
    const { email, password } = req.body;

    // Find Seller alreayd exist or NOT
    const user = await Profile.findOne({ email });

    // IF requested email address NOT found then throw error
    if (!user) {
      return res
        .status(400)
        .json({ error: "Seller not found with that email address" });
    }

    // Compare the enter password with exist password
    const comparePsw = await bcrypt.compare(password, user.password);

    // Return Error IF entered Password wrong
    if (!comparePsw) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If seller enter correct credentials then return token
    const data = {
      id: user.id,
    };

    // Return JWT_TOKEN to seller as a response
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({ authToken, user });
  } catch (error) {
    console.log(error);
  }
};

// Controller for getting the single product detail
exports.getProfileDetail = async (req, res) => {
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

// Get single profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Updated to req.userId

    const profile = await Profile.findOne({ _id: userId }); // Updated to findOne

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller for GET the order
exports.getOrders = async (req, res) => {
  try {
    const sellerId = req.userId; // Use req.userId instead of req.user.id

    // Query the database for orders associated with the sellerId
    const orders = await BookService.find({ serviceProvider: sellerId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller for UPDATE the profile
exports.updateProfile = async (req, res) => {
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

    const profileId = req.userId; // Get the profile ID from the authenticated user

    // Find the profile by ID and update its fields
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        name: name,
        email: email,
        contactNum: contactNum,
        cnicNumber: cnicNumber,
        address: address,
        skill: skill,
        imgURL: imgURL,
        description: description,
      },
      { new: true, omitUndefined: true, select: "-password" } // Return the updated profile excluding the password field
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller for GET earnings
exports.getEarnings = async (req, res) => {
  try {
    const sellerId = req.userId;

    // Calculate the total earnings for the current month
    const currentMonthStartDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const currentMonthEndDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const currentMonthEarnings = await BookService.aggregate([
      {
        $match: {
          serviceProvider: mongoose.Types.ObjectId(sellerId),
          status: "complete",
          date: {
            $gte: currentMonthStartDate,
            $lte: currentMonthEndDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$price" },
        },
      },
    ]);

    // Calculate the total earnings overall
    const totalEarnings = await BookService.aggregate([
      {
        $match: {
          serviceProvider: mongoose.Types.ObjectId(sellerId),
          status: "complete",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$price" },
        },
      },
    ]);

    res.status(200).json({
      currentMonthEarnings: currentMonthEarnings[0]?.totalEarnings || 0,
      totalEarnings: totalEarnings[0]?.totalEarnings || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
