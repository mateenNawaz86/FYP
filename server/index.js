const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Database connection
const connectedToMongo = require("./utils/database");
connectedToMongo(); // connect to MONGODB cluster

// Import routes from ROUTES folder
const authRoute = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const bookingRoute = require("./routes/booking");
const contactRoute = require("./routes/contact");
const feedbackRoute = require("./routes/feedback");
const experieneRoute = require("./routes/experience");

// create server using express
const app = express();
const port = process.env.PORT || 8000; // Default port

// Midleware used for read/write JSON formate data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Invoke cross-origin sharing policy
app.use(cors());

// ROUTES
app.use("/api", authRoute);
app.use("/api", profileRoutes);
app.use("/api", bookingRoute);
app.use("/api", contactRoute);
app.use("/api", feedbackRoute);
app.use("/api", experieneRoute);

app.listen(port, () => {
  console.log(`FYP application listening on ${port}`);
});
