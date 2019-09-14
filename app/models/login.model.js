const mongoose= require('mongoose');
const LoginSchema = mongoose.Schema({

    userid: {
      type: String,
      required: true
      },

    username: {
      type: String,
      required: true
    },

    usertype: {
        type: String,
        required: true
        },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },
    
    timestamps:true
    
  });

module.exports =mongoose.model('Login',LoginSchema);