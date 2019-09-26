const express=require("express");
const router=express.Router();
const user=require("../controllers/user.controller.js");

router.post('/login',user.login);
router.post('/register',user.register);
router.get('/retrieve',user.retrieve);
router.get("/getimage/:username", user.getimage);
router.put('/update',user.update); 
router.put('/updateusername',user.updateusername);  
router.put('/updatepassword',user.updatepassword);  
router.delete('/deleteaccount',user.deleteaccount); 
router.post('/storeimage',user.storeimage)
module.exports = router;


