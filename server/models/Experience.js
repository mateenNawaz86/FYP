const mongoose = require("mongoose");
const { Schema } = mongoose;

const expSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
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
