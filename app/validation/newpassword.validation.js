const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateNewPassword(data) {

  let passworderrors = {};

  data.currentpassword = !isEmpty(data.currentpassword) ? data.currentpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

  if (Validator.isEmpty(data.currentpassword)) {
    passworderrors.currentpassword = "Current password field is required";
  }
  if (Validator.isEmpty(data.newpassword)) {
    passworderrors.newpassword = "New password field is required";
  }
  if (Validator.isEmpty(data.confirmpassword)) {
    passworderrors.confirmpassword = "Confirm password field is required";
  }
  if (!Validator.equals(data.newpassword, data.confirmpassword)) {
    passworderrors.confirmpassword = "Passwords must match";
  }
  return {
    passworderrors,
    isValid: isEmpty(passworderrors)
  };
};