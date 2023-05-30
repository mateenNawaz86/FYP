const mongoose = require("mongoose");
const { Schema } = mongoose;

const expSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Experience = mongoose.model("Experience", expSchema);
module.exports = Experience;
