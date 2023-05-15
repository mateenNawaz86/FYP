const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNum: {
    type: String,
    required: true,
  },
  cnicNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },

  imgURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
