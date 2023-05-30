const { body, validationResult } = require("express-validator");

exports.validateDate = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/)
    .withMessage(
      "Invalid date format. Please provide the date in MM/YYYY format"
    ),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map((error) => error.msg);
  res.status(400).json({
    success: false,
    message: errorMessages,
  });
};
