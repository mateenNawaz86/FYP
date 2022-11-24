const mongoose = require("mongoose");

// MONGODB URI
const uri = "mongodb://localhost:27017/dummy__fyp";

// function for connecting to MongoDB
const connectedToMongo = () => {
  mongoose.connect(uri, () => {
    console.log("Connected to mongo successfully");
  });
};

// export the connection function
module.exports = { connectedToMongo };
