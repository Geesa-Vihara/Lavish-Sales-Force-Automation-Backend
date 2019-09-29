const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {

  let registererrors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.nic = !isEmpty(data.nic) ? data.nic : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.telno = !isEmpty(data.telno) ? data.telno : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.username)) {
    registererrors.username = "Username field is required";
  }
  if (Validator.isEmpty(data.firstname)) {
    registererrors.firstname = "Firstname field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    registererrors.lastname = "Lastname field is required";
  }
  if (Validator.isEmpty(data.nic)) {
    registererrors.nic = "NIC field is required";
  }
  if (Validator.isEmpty(data.telno)) {
    registererrors.telno = "Telephone number field is required";
  }
  if (Validator.isEmpty(data.address)) {
    registererrors.address = "Address field is required";
  } 
  if (Validator.isEmpty(data.email)) {
    registererrors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    registererrors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    registererrors.password = "Password field is required";
  }  
  if (Validator.isEmpty(data.password2)) {
    registererrors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    registererrors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    registererrors.password2 = "Passwords must match";
  }
  return {
    registererrors,
    isValid: isEmpty(registererrors)
  };
};