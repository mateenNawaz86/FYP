const signUpModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SCreate key
const SCURE_KEY = "M@t33n86N@w@z";
// Controller for sign up route -> logged in NOT required
const signUp_user = async (req, res) => {
  try {
    // destructure the data from the request
    const { name, email, password } = req.body;
    let user = await signUpModel.findOne({ email: email });

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
    const newUser = await signUpModel.create({
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

    const authToken = jwt.sign(data, SCURE_KEY);
    res.json({ authToken });
    
  } catch (error) {
    console.log(error);
  }
};

// Export the controller function
module.exports = {
  signUp_user,
};
