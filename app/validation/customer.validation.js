const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDistributor(data){

    let errors = {};
    data.shop = !isEmpty(data.shop)?data.shop:"";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.area = !isEmpty(data.area) ? data.area : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNoo : "";
    data.address = !isEmpty(data.address) ? data.address : "";
  
    if (Validator.isEmpty(data.shop)) {
        errors.shop = "shop field is required";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Full name field is required";
    }
    if (Validator.isEmpty(data.area)) {
         errors.area = "Area field is required";
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = "type field is required";
    }
    if (Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = "phone number field is required";
    }
    else if (!Validator.isLength(data.phoneNo, { min:10,max:10})) {
        errors.phoneNo = "Phone Number must be 10 digits";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    } 
    if (!Validator.isEmail(data.email) && !Validator.isEmpty(data.email) ) {
        errors.email = "Email is invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };


}