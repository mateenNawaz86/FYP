const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Schema } = mongoose;
dotenv.config();

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  contactNum: {
    type: String,
    required: true,
  },
  cnicNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },

  imgURL: {
    type: String,
    required: true,
  },
  description: {
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
profileSchema.methods.generatePasswordResetToken = function () {
  this.resetToken = jwt.sign({ sellerId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  this.resetTokenExpiration = Date.now() + 60 * 60 * 1000; // Token valid for 1 hour
};

const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
