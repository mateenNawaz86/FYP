const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "complete", "cancel"],
    default: "active",
  },
  serviceProvider: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const BookService = mongoose.model("Booking", bookingSchema);
module.exports = BookService;
