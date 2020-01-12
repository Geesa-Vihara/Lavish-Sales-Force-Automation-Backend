const mongoose = require('mongoose');
//const customer = require("./customer.model");
// const Base = require("./base.model");
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);



const Schema = mongoose.Schema;         //defining schema
const salesRepSchema = new Schema({

    userName:{
        type : String,
        required :[ true,"UserName field is required"],
        trim : true,
        lowercase:true,
        unique : true,
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
    },
    status :{
        type:String,           //active or inactive
        default:"active"
    },
     totalOrders:{
        type:Number,
        default:0
     },
     totalCustomers:{
        type:Number,
        default:0
     },
     isLogin :{
         type:Boolean,
         default:true
     },

    
 },
    // {
    // toJSON: { virtuals: true } 
    // },
     {
     timestamps:true
        }
);

// salesRepSchema.virtual('numDoc',{
//     ref :'customer',
//     localField :'area',          // find people where 'area'
//     foreignField : 'area',       // is equal to 'area'
//     count:true                   //only get number of docs
// });
 
//compile model from schema
const SalesRep = mongoose.model('salesReps',salesRepSchema);
// const SalesRep = Base.discriminator('salesrep',salesRepSchema);
module.exports = SalesRep;