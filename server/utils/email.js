const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email address or use environment variable
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app-specific password
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: "mateen@gmail.com", // Replace with your desired sender email address
    to: email,
    subject: "Password Reset",
    text: `Please click on the following link to reset your password: ${process.env.APP_URL}/reset-password/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

module.exports = { sendPasswordResetEmail };
