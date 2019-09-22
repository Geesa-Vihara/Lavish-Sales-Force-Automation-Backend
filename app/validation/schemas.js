
const Joi = require('Joi');

const schemas = {

    salesRep : Joi.object().keys({

        id       : Joi.number().required(),
        userName : Joi.string().required(),
        fullName : Joi.string().required(),
        nic      : Joi.string().required(),
        area     : Joi.string().required(),
        address  : Joi.string().required(),
        phoneNo  : Joi.number().required(),
        email    : Joi.string().email().lowercase().optional(),
        password : Joi.string().required().strict(),
        confirmPassword : Joi.string().valid(Joi.ref('password')).required().strict()
    
})
};
module.exports = schemas;