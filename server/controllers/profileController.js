const Profile = require("../models/Profile");
const BookService = require("../models/Booking");
const { sendPasswordResetEmail } = require("../utils/email");

const bcrypt = require("bcryptjs"); // used for hash password
const jwt = require("jsonwebtoken"); // used for generate JWT_token
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const Feedback = require("../models/Feedback");
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

// Forogt-Psw controller
exports.forgotPsw = async (req, res) => {
  const { email } = req.body;

  try {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Generate a password reset token
    profile.generatePasswordResetToken();

    // Save the user with the reset token
    await profile.save();

    // Send password reset email
    await sendPasswordResetEmail(profile.email, profile.resetToken, "seller");

    res
      .status(200)
      .json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset-Psw controller
exports.postResetPsw = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.sellerId;

    // Find the user
    const seller = await Profile.findById(sellerId);

    // IF user NOT exist with that ID
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Update the password
    const hashedPassword = await bcrypt.hash(password, 10);
    seller.password = hashedPassword;
    seller.resetToken = undefined;
    await seller.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

    // Retrieve the average rating for the seller using Feedback model
    const feedback = await Feedback.aggregate([
      {
        $match: { sellerId: mongoose.Types.ObjectId(profile._id) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating = feedback.length > 0 ? feedback[0].averageRating : 0;

    // Add the average rating to the profile object
    const profileWithRating = {
      ...profile._doc,
      averageRating,
    };

    // Return the profile detail with average rating as a JSON response
    res.json(profileWithRating);
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

    if (filteredProfiles.length === 0) {
      return res.json([]); // Return empty array when no profiles are found
    }

    res.json(filteredProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single profile
exports.getProfile = async (req, res) => {
  try {
    const sellerId = req.userId; // Updated to req.userId
    const profile = await Profile.findOne({ _id: sellerId }); // Updated to findOne

    // IF profile NOT exist with this specific ID
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // calculate the feedback
    const feedback = await Feedback.aggregate([
      {
        $match: { sellerId: mongoose.Types.ObjectId(profile._id) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating = feedback.length > 0 ? feedback[0].averageRating : 0;

    // Add the average rating to the profile object
    const profileWithRating = {
      ...profile._doc,
      averageRating,
    };

    res.status(200).json(profileWithRating);
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

// controller for getting the reviews
exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const feedbacks = await Feedback.aggregate([
      {
        $match: { sellerId: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users", // Use the actual name of the User collection
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
          imgURL: { $arrayElemAt: ["$user.imgURL", 0] },
          date: 1,
        },
      },
    ]);

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
