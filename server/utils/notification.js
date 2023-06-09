const nodemailer = require("nodemailer");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email address or use environment variable
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app-specific password
  },
});

const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

module.exports = {
  emailTransporter,
  twilioClient,
};
