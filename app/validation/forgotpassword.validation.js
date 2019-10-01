const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateForgotPassword(data) {
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : "";
    
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }      
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };