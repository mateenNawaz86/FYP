const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { Schema } = mongoose;

// Data Pattern for signup route
const userSchema = new Schema({
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
  
  resetToken: String,
  resetTokenExpiration: Date,

  date: {
    type: Date,
    default: Date.now,
  },
});

// Method to generate a password reset token
userSchema.methods.generatePasswordResetToken = function () {
  this.resetToken = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  this.resetTokenExpiration = Date.now() + 60 * 60 * 1000; // Token valid for 1 hour
};

// export the model
const User = mongoose.model("user", userSchema);
module.exports = User;
