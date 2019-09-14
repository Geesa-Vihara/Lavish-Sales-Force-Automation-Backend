const express=require("express");
const router=express.Router();
const user=require("../controllers/user.controller.js");
    
router.post('/login',user.login);
router.post('/register',user.register);
module.exports = router;

