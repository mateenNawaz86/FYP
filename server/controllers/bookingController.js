const BookService = require("../models/Booking");

// 1. Controller for booking a service
exports.bookService = async (req, res, next) => {
  try {
    // grab all input data from request body
    const {
      name,
      email,
      address,
      phoneNumber,
      service,
      postalCode,
      description,
    } = req.body;

    // Create a new booking instance
    const newBooking = new BookService({
      name,
      email,
      address,
      phoneNumber,
      service,
      postalCode,
      description,
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
  }
};
