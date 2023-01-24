import mongoose from "mongoose";
const { Schema } = mongoose;

// Data Pattern for signup route
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// export the model
const User = mongoose.model("user", userSchema);
export default User;
