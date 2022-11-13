const signUpModel = require("../models/UserModel");

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

    // Create a new user is here
    const newUser = await signUpModel.create({
      name: name,
      email: email,
      password: password,
    });
    res.json(newUser);

  } catch (error) {
    console.log(error);
  }
};

// Export the controller function
module.exports = {
  signUp_user,
};
