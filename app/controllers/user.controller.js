//pull required dependencies
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require('../../config/database.config');
//load User model
const User=require("../models/user.model.js");

//load login validation
const validateLoginInput=require("../validation/login.validation.js");
const validateRegisterInput=require("../validation/register.validation.js");

exports.login=(req,res)=>{
    const {errors, isValid}=validateLoginInput(req.body);
    //check validation
    if (!isValid){
        return res.status(400).json(errors);
    }
    const username =req.body.username;
    const password =req.body.password;

    //find user by username
    User.findOne({username}).then(user=>{
        //find if username exists
        if(!user){
            return res.status(404).json({incorrect: "Incorrect Username or password"});
        }
        
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                // User matched
                // Create JWT Payload
                const payload={
                    id: user.id,
                    name:user.name
                };
                //sign token
                jwt.sign(
                    payload,
                    config.secretOrKey,
                    {
                        expiresIn:31556926 //1 year in seconds
                    },
                    (err,token)=>{
                        res.json({
                            success:true,
                            token:"Bearer"+token
                        });
                    }
                );
            }else{
                return res
                .status(400)
                .json({incorrect: "Incorrect Username or password"});
            }
        });
    });
};

exports.register=(req,res)=>{
     // Form validation
     const { errors, isValid } = validateRegisterInput(req.body);// Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }User.findOne({ username: req.body.username }).then(user => {
       if (user) {
         return res.status(400).json({ Username: "Username already exists" });
       } else {
         const newUser = new User({
           username: req.body.username,
           nic:req.body.nic,
           firstname: req.body.firstname,  
           lastname: req.body.lastname,  
           email: req.body.email,
           telno: req.body.telno,
           address: req.body.address,
           password: req.body.password
         });// Hash password before saving in database
         bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
             if (err) throw err;
             newUser.password = hash;
             newUser
               .save()
               .then(user => res.json(user))
               .catch(err => console.log(err));
           });
         });
       }
     });
};
