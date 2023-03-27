const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs"); // used for hash password
const jwt = require("jsonwebtoken"); // used for generate JWT_token
const dotenv = require("dotenv");
dotenv.config();

// Secret key
const SECRET_KEY = process.env.SECRET__KEY;

// Controller for sign up route -> logged in NOT required
exports.signUp = async (req, res) => {
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
    const authToken = jwt.sign(data, SECRET_KEY);
    res.status(200).json({ authToken, user });
  } catch (error) {
    console.log(error);
  }
};

// GET Controller for forget-password
exports.getForgetPsw = (req, res) => {
  res.render("forget-password");
};

// POST controller for forget-password
exports.postForgetPsw = async (req, res, next) => {
  const { email } = req.body;
  // Find entered email from Databse
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User NOT resgistered!" });
  }

  // User exist & now create a one time valid link for 15m
  const secret = SECRET_KEY + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };

  const authToken = jwt.sign(payload, secret, { expiresIn: "10m" });
  const link = `http://localhost:5000/api/reset-password/${user.id}/${authToken}`;
  console.log(link);

  res.send("Password reset link successfully send to the user email...");
};

// GET controller for reset-password route
exports.getResetPsw = async (req, res) => {
  const { id, authToken } = req.params;
  const { email } = req.body;

  // Find entered email from Databse
  const user = await userModel.findOne({ email });

  // Check if this 'id' exist in the database or NOT
  if (id !== user.id) {
    return res
      .status(400)
      .json({ error: "User not found with that email address" });
  }

  // If we have a valid id & email address
  const secret = SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(authToken, secret);
    res.render("reset-password", { email: email });
  } catch (error) {
    console.log(error.message);
  }
};

// POST controller for the Reset-password
exports.postResetPsw = async (req, res) => {
  const { id, authToken } = req.params;
  const { email, password } = req.body;

  // Find entered email from Databse
  const user = await userModel.findOne({ email });

  // Check if this 'id' exist in the database or NOT
  if (id !== user.id) {
    return res
      .status(400)
      .json({ error: "User not found with that email address" });
  }

  const secret = SECRET_KEY + user.password;
  try {
    const payload = jwt.sign(authToken, secret);

    // We can simply find the user  with the payload email & id and update the psw
    // Always hash the pse before saving
    user.password = password;
  } catch (error) {
    console.log(error.mess);
  }
};
