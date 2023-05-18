const mongoose = require("mongoose");
const crypto = require("crypto");

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
  this.resetToken = crypto.randomBytes(20).toString("hex");
  this.resetTokenExpiration = Date.now() + 900000; // Token valid for 1 hour
};

// export the model
const User = mongoose.model("user", userSchema);
module.exports = User;
