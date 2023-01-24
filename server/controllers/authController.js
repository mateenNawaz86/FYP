import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs"; // used for hash password
import jwt from "jsonwebtoken"; // used for generate JWT_token
import dotenv from "dotenv";
dotenv.config();

// Secret key
const SECRET_KEY = process.env.SECRET__KEY;

// Controller for sign up route -> logged in NOT required
export const signUp = async (req, res) => {
  try {
    // destructure the data from the request body
    const { name, email, password } = req.body;

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
    });

    // Save user into database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

// Controller for sign in route -> logged in NOT required
export const signIn = async (req, res) => {
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
    const comparePsw = bcrypt.compare(password, user.password);

    // Return Error IF entered Password wrong
    if (!comparePsw) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If user enter correct credentials then return token
    const data = {
      id: user.id,
    };

    // Return JWT_TOKEN to user as a response
    const authToken = jwt.sign(data, SECRET_KEY);
    res.status(200).json({ authToken });
  } catch (error) {
    console.log(error);
  }
};
