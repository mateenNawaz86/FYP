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
    const userId = req.user.id; // Get the logged-in user's ID

    const orders = await BookService.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller for submit the rating and feedback
// exports.submitRatingAndFeedback = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating, feedback } = req.body;

//     const order = await BookService.findByIdAndUpdate(
//       id,
//       { rating, feedback },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({ message: "Rating and feedback submitted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
