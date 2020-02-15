const mongoose = require('mongoose');
// const Base = require("./base.model");
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
    salesrep:{
        type:String,
        default:''
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
    },
     status :{
         type:String,           //active or inactive
         default:"active"
     },
     isLogin :{
         type:Boolean,
         default:false

     } 
    
},
     {
     timestamps : true
     }
);
// const Distributor = Base.discriminator('distributor',distributorSchema);
const Distributor = mongoose.model('distributors',distributorSchema);
module.exports = Distributor

// ERRORS - discriminator gives Can't customize discriminator option timestamps (can only modify toJSON, toObject, _id, id)
//It hasn't resolve yet in new relase