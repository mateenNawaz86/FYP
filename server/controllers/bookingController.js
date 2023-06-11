const BookService = require("../models/Booking");
const Profile = require("../models/Profile");

const { emailTransporter, twilioClient } = require("../utils/notification");
const PhoneNumber = require("awesome-phonenumber"); // Import the phone number validation library

const dotenv = require("dotenv");
dotenv.config();

// 1. Controller for booking a service
exports.bookService = async (req, res, next) => {
  try {
    // Grab all input data from the request body
    const {
      name,
      email,
      address,
      phoneNumber,
      service,
      postalCode,
      price,
      description,
    } = req.body;

    // Get the service provider ID
    const serviceProviderId = req.params.id; // Assuming the ID is passed as a parameter

    // Get the logged-in user's ID
    const userId = req.user.id;

    // Create a new booking instance
    const newBooking = new BookService({
      name,
      email,
      address,
      phoneNumber,
      service,
      postalCode,
      price,
      description,
      serviceProvider: serviceProviderId, // Associate the booking with the service provider
      user: userId, // Associate the booking with the logged-in user
    });

    // Save the booking to the database
    await newBooking.save();

    // Retrieve the service provider's contact details
    const serviceProvider = await Profile.findById(serviceProviderId);

    // Send booking email
    const mailOptions = {
      from: email,
      to: serviceProvider.email,
      subject: "New Service Booking",
      text: `A new service has been booked by ${name}.`,
    };

    emailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending booking email:", error);
      } else {
        console.log("Booking email sent:", info.response);
      }
    });

    // Validate the phone number using regular expression
    const phoneNumberRegex = /^\+\d{1,3}\d{3,14}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      // Send booking SMS
      const message = `A new service has been booked by ${name}.`;

      await twilioClient.messages
        .create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
        })
        .then((message) => console.log("Booking SMS sent:", message.sid))
        .catch((error) => console.error("Error sending booking SMS:", error));
    } else {
      console.error("Invalid phone number:", phoneNumber);
    }

    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Controller for updating the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the order by ID and update the status
    const order = await BookService.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. Controller for getting the current order
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID

    const orders = await BookService.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
