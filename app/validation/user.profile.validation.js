const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserProfile(data) {
    let errors = {};
    
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.telno = !isEmpty(data.telno) ? data.telno : "";
    data.nic = !isEmpty(data.nic) ? data.nic : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    
    if (Validator.isEmpty(data.firstname)) {
      errors.firstname = "Firstname field is required";
    } 
    if (Validator.isEmpty(data.lastname)) {
      errors.lastname = "Lastname field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    if (Validator.isEmpty(data.telno)) {
    errors.telno = "Telephone no field is required";
    } 
    if (Validator.isEmpty(data.nic)) {
    errors.nic = "NIC field is required";
    } 
    if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
    } 
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };