const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret_key = process.env.SECRET__KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded.user; // Assuming user data is stored in the token
    next();
  });
};

module.exports = authenticate;
