const express = require("express");

const { connectedToMongo } = require("./database");
const userRoute = require("./routes/user");

const app = express();
const port = process.env.PORT || 8000;

// function for connect to MongoDB
connectedToMongo();

// Midleware used for read/write JSON formate data
app.use(express.json());

// Routes
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`FYP listening on ${port}`);
});
