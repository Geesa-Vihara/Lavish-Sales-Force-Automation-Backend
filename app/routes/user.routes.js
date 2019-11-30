const express=require("express");
const router=express.Router();
const user=require("../controllers/user.controller.js");
const verifyToken=require("../auth/verifyToken.js");

router.post('/login',user.login);
router.post('/forgotpassword',user.forgotpassword);
router.post('/resetpassword',user.resetpassword);
router.post('/register',verifyToken,user.register);
router.get('/retrieve',verifyToken, user.retrieve);
router.get("/getimage/:token",verifyToken, user.getimage);
router.put('/update',verifyToken,user.update); 
router.put('/updateusername',verifyToken,user.updateusername);  
router.put('/updatepassword',verifyToken,user.updatepassword);  
//router.delete('/deleteaccount',verifyToken,user.deleteaccount); 
router.post('/storeimage',verifyToken,user.storeimage)

module.exports = router;


