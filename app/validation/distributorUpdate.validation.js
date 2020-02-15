const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateDistributor(data){

    let errors = {};
    data.userName = !isEmpty(data.userName)?data.userName:"";
    data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
    data.area = !isEmpty(data.area) ? data.area : "";
    data.warehouse = !isEmpty(data.warehouse) ? data.warehouse : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    

    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username field is required";
    }
    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = "Full name field is required";
    }
    if (Validator.isEmpty(data.area)) {
         errors.area = "Area field is required";
    }
    if (Validator.isEmpty(data.warehouse)) {
        errors.warehouse = "warehouse field is required";
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