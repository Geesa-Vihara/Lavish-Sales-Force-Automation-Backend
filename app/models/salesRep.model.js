const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

const Schema = mongoose.Schema;         //defining schema
const salesRepSchema = new Schema({

    id:{
        type : Number,          // objectid??
        required : [true,"id field is required"],
        unique : true,
    },
    userName:{
        type : String,
        required :[ true,"UserName field is required"],
        trim : true,
        lowercase:true
    },
    fullName:{
        type : String,
        required : true,
    },
    nic:{
        type : String,
        required : true,
    },
    area:{
        type:String,
        required : true,
    },
    address:{
        type:String,
        required : true,

    },
    phoneNo:{
        type:String,
        required : true,
    },
    email:{
        type:String,
    },
},
    {
    timestamps: true
    }
);
 
//compile model from schema
const SalesRep = mongoose.model('salesReps',salesRepSchema);
module.exports = SalesRep;