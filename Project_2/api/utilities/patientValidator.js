const { body, validationResult } = require('express-validator');
const validate = {};

validate.patientAddValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Please provide a first name!"),

    body("lastName")
      .notEmpty()
      .withMessage("Please provide a last name!"),

    body("age")
      .notEmpty()
      .isNumeric()
      .withMessage("Age must be a Number, and it is required!"),

    body("bloodType")
      .notEmpty()
      .withMessage("Bood Type is required!"),

    body("insuranceDetails")
      .notEmpty()
      .withMessage("Insurance status is required!"),
  ]
}

validate.patientupdateValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Please provide a first name!"),

    body("lastName")
      .notEmpty()
      .withMessage("Please provide a last name!"),

    body("age")
      .notEmpty()
      .isNumeric()
      .withMessage("Age must be Numeric, and it is required!"),

    body("bloodType")
      .notEmpty()
      .withMessage("Bood Type is required!"),

    body("insuranceDetails")
      .notEmpty()
      .withMessage("Insurance status is required!"),
  ]
}

validate.doctorAddValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Please provide a first name!"),

    body("lastName")
      .notEmpty()
      .withMessage("Please provide a last name!"),

    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Email must be an email, and it is required!"),

    body("phoneNumber")
      .notEmpty()
      .isNumeric()
      .withMessage("Phone number is required!"),

    body("department")
      .notEmpty()
      .withMessage("Doctor department is required!"),
  ]
}

validate.doctorUpdateValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Please provide a first name!"),

    body("lastName")
      .notEmpty()
      .withMessage("Please provide a last name!"),

    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Email must be an email, and it is required!"),

    body("phoneNumber")
      .notEmpty()
      .isNumeric()
      .withMessage("Phone number is required!"),

    body("department")
      .notEmpty()
      .withMessage("Doctor department is required!"),
  ]
}

validate.checkAddPatient = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

validate.checkUpdatePatient = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

validate.checkAddDoctor = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

validate.checkUpdateDoctor = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = validate;