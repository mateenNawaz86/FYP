const { check, validationResult } = require("express-validator");

// Validation checks for new entry
exports.validateDate = [
  check("start")
    .matches(/^(0[1-9]|1[0-2])-(20\d{2})$/)
    .withMessage("Invalid start date format. Please use MM-YYYY format."),

  check("end")
    .matches(/^(0[1-9]|1[0-2])-(20\d{2})$/)
    .withMessage("Invalid end date format. Please use MM-YYYY format."),
];

// Return an error array if new user is not valid
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((error) => error.msg);
  res.status(400).json({
    success: false,
    errors: errorMessages,
  });
};
