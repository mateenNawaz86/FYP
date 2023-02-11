import express from "express"; // for creating express server
import dotenv from "dotenv"; // for environment variables
import cors from "cors";
dotenv.config();

// Database connection
import { connectedToMongo } from "./database.js";
connectedToMongo(); // connect to MONGODB cluster

// Import routes from ROUTES folder
import authRoute from "./routes/auth.js";

// create server using express
const app = express();
const port = process.env.PORT || 8000; // Default port

// Midleware used for read/write JSON formate data
app.use(express.json());

// Invoke cross-origin sharing policy
app.use(cors());

// ROUTES
app.use("/api", authRoute);

app.listen(port, () => {
  console.log(`FYP application listening on ${port}`);
});
