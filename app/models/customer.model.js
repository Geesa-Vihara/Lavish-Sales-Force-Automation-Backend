const mongoose = require('mongoose');

const Schema=mongoose.Schema;
const customerSchema = new Schema({
    
    shop:{
        type : String,
        required : true,
    },
    name:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    area:{
        type : String,
        required : true,
    },
     route:{
         type:String,
         required:true
     },
    address:{
        type : String,
        required : true,
    },
    phoneNo:{
        type : String,
        required : true,
    },
    email:{
        type : String,
    },
     status :{
         type:String,           //active or inactive
         default:"active"
     },
     
},
    {
    timestamps : true
    }
);
const Customer = mongoose.model('customers',customerSchema);
module.exports = Customer;