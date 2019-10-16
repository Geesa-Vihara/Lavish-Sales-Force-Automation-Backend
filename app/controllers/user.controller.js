const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require('../../config/database.config.js');
const multer=require("multer");
const path = require("path");
const fs=require("fs");
const nodemailer=require("nodemailer");
require('dotenv').config();

const User=require("../models/user.model.js");
const validateLoginInput=require("../validation/login.validation.js");
const validateForgotPassword=require("../validation/forgotpassword.validation.js");
const validateRegisterInput=require("../validation/register.validation.js");
const validateUserProfile=require("../validation/user.profile.validation.js");
const validateNewUserName=require("../validation/newusername.validation.js");
const validateNewPassword=require("../validation/newpassword.validation.js");
const validateResetPassword=require("../validation/resetpassword.validation.js")

const storage = multer.diskStorage({
  destination: "app/images",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
const upload=multer({
  storage: storage,
  limits:{
    fileSize: 10000000,
    
  },
  fileFilter: (req, file, cb) => {
    var type = file.mimetype;
    var typeArray = type.split("/");
    if(typeArray[0] !== "image"){
      return cb(null,false)
    }
    return cb(null,true);
   
}
}).single("myImage");

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
                    name:user.username
                };
                //sign token
                jwt.sign(
                    payload,
                    config.secretOrKey,
                    {
                        expiresIn: 86400//1 day in seconds
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
    }).catch(err=>{
      console.error("error found!!!"+err);
      return res.status(400).json(err)
    });
};

exports.forgotpassword=(req,res)=>{
  const {errors, isValid}=validateForgotPassword(req.body);
    //check validation
    if (!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(400).json({ email: "Can't find the email" });

      }
      
      const token=jwt.sign(
      {email:user.email},
      config.secretOrKey,
      {
          expiresIn: 3600//1 hour in seconds
      }        
      );
      
      const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
          user: `${process.env.FORGOT_EMAIL}`,
          pass: `${process.env.FORGOT_PASSWORD}`,
        }
      });

      const mailOptions={
        from:`${process.env.FORGOT_EMAIL}`,
        to:`${user.email}`,
        subject:`Link to reset password`,
        text:
        `We have received a request to reset password for your account.\n\n`+
        `Please click on the following link to complete the process within one hour of recieving it:\n\n`+
        `http://localhost:3000/resetpassword/${token}\n\n`+
          `It can be safely ignored if you didn't request this.\n`
      };
      transporter.sendMail(mailOptions,function(err){
        if(err){
          console.log(err);
          return res.status(400).json({email:"Could not send email"});
        }else{
          return res.status(200).json({correct:"Reset link sent check your email"});
        }
      })
    }).catch(err=>{
      console.error("error found!!!"+err);
      return res.status(400).json(err)
    })


}

exports.resetpassword=(req,res)=>{
  const {errors, isValid}=validateResetPassword(req.body);
  if (!isValid){
    return res.status(400).json(errors);
  }
  if(req.body.token){
    jwt.verify(req.body.token,config.secretOrKey,function(err,decoded){
      if(err && err.name === 'TokenExpiredError'){
          return res.status(400).send({incorrect:"Reset link expired"});
      }
      else if(err){
          return res.status(400).send({incorrect:"Can't verify link"});

      }
      else{
        User.findOne({email:decoded.email}).then(user=>{
          if(!user){
            return res.status(400).json({ password: "Can't find the email" });
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then( res.json({correct:"Updated password successfully please login again"}))
                .catch(err => console.log(err));
            });
          });
    
    
        }).catch(err=>{
          console.error("error found!!!"+err);
          return res.status(400).json(err)
        })
      }
      })
  }
}

exports.register=(req,res)=>{
     // Form validation
     const { registererrors, isValid } = validateRegisterInput(req.body);// Check validation
     if (!isValid) {
       return res.status(400).json(registererrors);
     }
     User.findOne({$or:[{ username: req.body.username },{email:req.body.email}]}).then(user => {
       if (user) {
         if(user.username===req.body.username && user.email===req.body.email){
          return res.status(400).json([{ username: "Username already exists" },{ email: "Email already exists" }]);
         }else if(user.username===req.body.username){
          return res.status(400).json({ username: "Username already exists" });
         }else if(user.email===req.body.email){
          return res.status(400).json({ email: "Email already exists" });
         }
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
     }).catch(err=>{
      console.error("error found!!!"+err);
      return res.status(400).json(err)
});
};

exports.retrieve=(req,res)=>{
  User.findOne({username:req.decoded.name}).then(user=>{
    
    if(user){ 
      const profile={
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        telno:user.telno,
        nic:user.nic,
        address:user.address,
        
      }     
      
      return res.status(200).json(profile);
    }else{
      console.log("hahahah");
      return res.status(400).json({ Username: "Username not found" });
      
    }
  }).catch(err=>{
    console.error("error found!!!"+err);
    return res.status(400).json(err)
});
};

exports.update=(req,res)=>{
  const {errors, isValid}=validateUserProfile(req.body);
  //check validation
  if (!isValid){
      return res.status(400).json(errors);
  }
    User.findOne({ username: req.decoded.name }).then(user => {
      if (user) {
        user.firstname=req.body.firstname,
        user.lastname=req.body.lastname,
        user.email=req.body.email,
        user.telno=req.body.telno,
        user.nic=req.body.nic,
        user.address=req.body.address
        user.save().then(user => {
          res.json('User updated!');
      })
      .catch(err => {
          res.status(400).send("Update not possible");
      });

      }else{
        return res.status(400).json({ Username: "Username not found" });
        
      } 
    }).catch(err=>{
      console.error("error found!!!"+err);
      return res.status(400).json(err)
});;

};

exports.updateusername=(req,res)=>{
  const {newusernameerrors, isValid}=validateNewUserName(req.body);
  //check validation
  if (!isValid){
      return res.status(400).json(newusernameerrors);
  }
  User.findOne({ username: req.body.newusername  }).then(user => {
    if(!user){
      User.findOne({ username: req.decoded.name }).then(user=>{
        user.username=req.body.newusername;
        user.save().then(
          res.json('Username updated!'))
          .catch(err => {
            res.status(400).send("Update not possible");
            });
      }) 
    }    
    else{
      return res.status(400).json({ newusername: "Username already exists" });
    }
  }).catch(err=>{
    console.error("error found!!!"+err);
    return res.status(400).json(err)
  });
  }
  
exports.updatepassword=(req,res)=>{
const {passworderrors, isValid}=validateNewPassword(req.body);
    
//check validation
if (!isValid){
    return res.status(400).json(passworderrors);
}

User.findOne({ username: req.decoded.name}).then(user => {
  if (user) {
    bcrypt.compare(req.body.currentpassword, user.password, function(err, match) {
      if(match) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then( res.json("Updated password"))
              .catch(err => console.log(err));
          });
        });
      } else {
        return res.status(400).json({ currentpassword: "Incorrect password" });
      } 
    });
    
  } else {
    return res.status(400).json("Username not found" );
  }
}).catch(err=>{
  console.error("error found!!!"+err);
  return res.status(400).json(err)
});
}
exports.deleteaccount=(req,res)=>{
        
  User.findOne({ username: req.decoded.name}).then(user => {
    if(user) {
      user.remove();
      return res.status(200).json({success:"Account deleted successfully" });
      
      
    }else{
      return res.status(400).json({error:"Username not found" });
    }
  }).catch(err=>{
    console.error("error found!!!"+err);
    return res.status(400).json(err)
  });
  }

  exports.storeimage=(req,res)=>upload(req,res,(err)=>{
    
    User.findOne({ username: req.decoded.name}).then(user => {
      if(user) {
        
        if(!req.file){
          return res.status(400).json({picupdate:"Image file required to update or image size too large to upload"});
        }
        
        else if(err){          
          return res.status(400).json({picupdate:"Update not possible"});
        }
        else{
          if(user.image!=="newuser.png"){
            fs.unlinkSync("app/images/"+user.image);
          }
          user.image=req.file.filename;
          user.save().then( res.json(req.file))
          .catch(err => console.log(err));
          
         
        }
      }else{        
        return res.status(400).json({error:"Username not found" });
      }
    }).catch(err=>{
      console.error("error found!!!"+err);
      return res.status(400).json(err)
    });
  
    
});


exports.getimage=(req,res)=>{
  
  User.findOne({ username:req.decoded.name}).then(user => {
    if(user) {
      
      res.sendFile(user.image,{ root: "app/images" });
      
      
    }else{
      return res.status(400).json({error:"Username not found" });
    }
  }).catch(err=>{
    console.error("error found!!!"+err);
    return res.status(400).json(err)
  });;
  
} 

 