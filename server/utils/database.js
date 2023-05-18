const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MONGODB URI
const mongoURI = process.env.MONGO_URI;

// function for connecting to MongoDB
const connectedToMongo = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then("Connected to MongoDB successfully!")
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectedToMongo;
