const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs"); // used for hash password
const jwt = require("jsonwebtoken"); // used for generate JWT_token
const { sendPasswordResetEmail } = require("../utils/email");

const dotenv = require("dotenv");
dotenv.config();

// Controller for sign up route -> logged in NOT required
exports.signUp = async (req, res) => {
  try {
    // destructure the data from the request body
    const { name, email, password, imgURL } = req.body;

    // Match requested email with already exists emails
    let user = await userModel.findOne({ email: email });

    // IF user already exist return response with 400 status code
    if (user) {
      return res.status(400).json({
        error: "User already exists with that email address",
      });
    }

    // Create a password hash and add salt to the password
    const salt = await bcrypt.genSalt(10);
    const secPsw = await bcrypt.hash(password, salt);

    // Create a new user is here
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: secPsw,
      imgURL: imgURL,
    });

    // Save user into database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

// Controller for sign in route -> logged in NOT required
exports.signIn = async (req, res) => {
  try {
    // Grabe Email, Password from request body
    const { email, password } = req.body;
    // Find entered email from Databse
    const user = await userModel.findOne({ email });

    // IF requested email address NOT found then throw error
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found with that email address" });
    }

    // Compare the enter password with exist password
    const comparePsw = await bcrypt.compare(password, user.password);

    // Return Error IF entered Password wrong
    if (!comparePsw) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If user enter correct credentials then return token
    const data = {
      id: user.id,
    };

    // Return JWT_TOKEN to user as a response
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({ authToken, user });
  } catch (error) {
    console.log(error);
  }
};

// Controller for forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    user.generatePasswordResetToken();

    // Save the user with the reset token
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user.email, user.resetToken, "user");

    res
      .status(200)
      .json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for post password reset
exports.postResetPsw = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user
    const user = await userModel.findById(userId);

    // IF user NOT exist with that ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
