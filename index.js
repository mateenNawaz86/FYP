import express from "express";
import { router as userRoute } from "./routes/User.js";

const app = express();
const port = process.env.PORT || 5000;

// routes
app.use("/", userRoute);

app.listen(port, () => {
  console.log("MVC app is listening port", port);
});
