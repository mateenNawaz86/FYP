const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email address or use environment variable
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app-specific password
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = async (email, token, accountType) => {
  let resetUrl = "";
  if (accountType === "user") {
    resetUrl = `${process.env.APP_URL}/user/reset-password/${token}`;
  } else if (accountType === "seller") {
    resetUrl = `${process.env.APP_URL}/seller/reset-password/${token}`;
  }

  const mailOptions = {
    from: "mateen@gmail.com", // Replace with your desired sender email address
    to: email,
    subject: "Password Reset",
    text: `Please click on the following link to reset your password: ${resetUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

module.exports = { sendPasswordResetEmail };
