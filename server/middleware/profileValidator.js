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

  check("contactNum").isMobilePhone().withMessage("Invalid contact number"),

  check("cnicNumber")
    .matches(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)
    .withMessage("Invalid CNIC number"),

  check("address")
    .isLength({ min: 3 })
    .withMessage("Address must be contain atleast 3 characters")
    .trim(),

  check("skill")
    .isLength({ min: 3 })
    .withMessage("Skill must be contain atleast 3 characters")
    .trim(),

  check("imgURL")
    .isLength({ min: 3 })
    .withMessage("imgURL must be contain atleast 3 characters")
    .trim(),
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
