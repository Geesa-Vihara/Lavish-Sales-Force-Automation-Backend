const mongoose= require('mongoose');
const UserSchema = mongoose.Schema({

    username: {
      type: String,
      required: true
    },   
    fullname: {
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
  },{
    timestamps: true
  });

module.exports = User = mongoose.model('users',UserSchema);