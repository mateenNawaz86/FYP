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
      price,
      description,
    } = req.body;

    // Get the service provider ID
    const serviceProviderId = req.params.id; // Assuming the ID is passed as a parameter

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
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
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
    // Assuming you have a logged-in seller ID stored in req.seller
    const order = await BookService.find();

    // Return the profile data
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
