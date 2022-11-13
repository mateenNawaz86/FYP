const mongoose = require("mongoose");
const { Schema } = mongoose;

// Data Pattern for signup route
const signUpModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// export the model
module.exports = mongoose.model("signUp", signUpModel);
