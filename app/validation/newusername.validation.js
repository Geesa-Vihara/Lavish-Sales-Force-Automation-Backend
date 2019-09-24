const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewUserName(data) {
    let newusernameerrors = {};
    
    data.newusername = !isEmpty(data.newusername) ? data.newusername : ""; 
    if (Validator.isEmpty(data.newusername)) {
        newusernameerrors.newusername = "Username field is required";
      }   
    return {
        newusernameerrors,
        isValid: isEmpty(newusernameerrors)
    };
  };