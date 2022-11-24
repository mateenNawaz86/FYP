const { check, validationResult } = require("express-validator");

// Validation checks for new entery
exports.validateUser = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be contain atleast 3 characters")
    .trim(),

  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address!"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing !")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

// Return an error array if new user is not valid
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  console.log(error);
  if (!error.length) return next();
  res.status(400).json({
    success: false,
    message: error,
  });
};
