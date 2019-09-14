const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {

  let errors = {};// Convert empty fields to an empty string so we can use validator functions

  data.username = !isEmpty(data.username) ? data.username : "";
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.telno = !isEmpty(data.telno) ? data.telno : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "Full name field is required";
  }
  if (Validator.isEmpty(data.telno)) {
    errors.telno = "Telephone number field is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  //confirm password check
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};