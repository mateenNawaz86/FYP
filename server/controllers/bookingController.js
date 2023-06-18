const BookService = require("../models/Booking");
const Profile = require("../models/Profile");

const { emailTransporter, twilioClient } = require("../utils/notification");

const dotenv = require("dotenv");
dotenv.config();

// 1. Controller for booking a service
exports.bookService = async (req, res, next) => {
  try {
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

    const serviceProviderId = req.params.id;
    const userId = req.user.id;

    const newBooking = new BookService({
      name,
      email,
      address,
      phoneNumber,
      service,
      postalCode,
      price,
      description,
      serviceProvider: serviceProviderId,
      user: userId,
    });

    await newBooking.save();

    const serviceProvider = await Profile.findById(serviceProviderId);

    const mailOptions = {
      from: emailTransporter.options.auth.user,
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

    const phoneNumberRegex = /^\+\d{1,3}\d{3,14}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      const message = `A new service has been booked by ${name}.`;

      try {
        const smsMessage = await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
        });
        console.log("Booking SMS sent:", smsMessage.sid);
      } catch (error) {
        console.error("Error sending booking SMS:", error);
      }
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
