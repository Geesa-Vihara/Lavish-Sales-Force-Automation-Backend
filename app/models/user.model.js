const mongoose= require('mongoose');
const UserSchema = mongoose.Schema({

    username: {
      type: String,
      required: true
    },   
    firstname: {
      type: String,
      required: true
    }, 
    lastname: {
      type: String,
      required: true
    },  
    nic: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true
    },
    telno: {
      type: String,
      required: true
    },  
    address: {
      type: String,
      required: true
    },  
    password: {
      type: String,
      required: true
    },
    lasttimenoticlicked:{
      type:Date,
      default:new Date()
    },
    image: {
      type: String,
      default:"newuser.png"
    },
  },{
    timestamps: true
  });

module.exports = User = mongoose.model('users',UserSchema);