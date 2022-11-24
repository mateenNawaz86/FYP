const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// SCreate key
const SECRET_KEY = process.env.SECRET__KEY;

// Controller for sign up route -> logged in NOT required
const signUp_user = async (req, res) => {
  try {
    // destructure the data from the request
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    // check if the user is already exists or NOT
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
    });

    // Cretae a data for token
    const data = {
      user: {
        id: newUser.id,
      },
    };

    const authToken = jwt.sign(data, SECRET_KEY);
    res.json({ authToken });
  } catch (error) {
    console.log(error);
  }
};

// Controller for sign in route -> logged in NOT required
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // Check if the user exist with this email address
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found with that email address" });
    }

    // Compare the enter password with given password
    const comparePsw = bcrypt.compare(password, user.password);
    if (!comparePsw) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If user enter correct credentials then return token
    const data = {
      user: {
        id: user.id,
      },
    };

    // return a token
    const authToken = jwt.sign(data, SECRET_KEY);
    res.json({ authToken });
  } catch (error) {
    console.log(error);
  }
};

// Export the controller function
module.exports = {
  signUp_user,
  signIn,
};
