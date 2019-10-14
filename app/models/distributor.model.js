const mongoose = require('mongoose');

const Schema=mongoose.Schema;
const distributorSchema = new Schema({
    
    userName:{
        type : String,
        required :true,
        trim : true,
        lowercase:true,
        unique : true,
    },
    fullName:{
        type : String,
        required : true,
    },
    warehouse:{
        type : String,
        required : true,
    },
    area:{
        type : String,
        required : true,
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
    password:{
        type : String,
        required : true
    }
},
    {
    timestamps : true
    }
);
const Distributor = mongoose.model('distributors',distributorSchema);
module.exports = Distributor;