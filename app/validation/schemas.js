
const Joi = require('Joi');

const schemas = {

    salesRep : Joi.object().keys({

        userName : Joi.string().required(),
        fullName : Joi.string().required(),
        nic      : Joi.string().required(),
        area     : Joi.string().required(),
        address  : Joi.string().required(),
        phoneNo  : Joi.string().max(10).min(10).required(),
        email    : Joi.string().email().lowercase().optional(),
        password : Joi.string().required().strict(),
        confirmPassword : Joi.string().valid(Joi.ref('password')).required().strict()
    
}),

    salesRepUpdate : Joi.object().keys({
        userName : Joi.string().required(),
        fullName : Joi.string().required(),
        nic      : Joi.string().required(),
        area     : Joi.string().required(),
        address  : Joi.string().required(),
        phoneNo  : Joi.string().max(10).min(10).required(),
        email    : Joi.string().email().lowercase().optional(),
    })
};
module.exports = schemas;