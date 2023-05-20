const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

exports.postContact = (req, res) => {
  const { name, email, subject, message } = req.body;

  // Send email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Replace with your email address
      pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Replace with your email address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Server error" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};
