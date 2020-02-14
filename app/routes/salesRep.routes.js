const express = require("express");
const router = express.Router();
const salesRep = require("../controllers/salesRep.controller.js");
//const schemas = require("../validation/schemas.js");
//const middleware = require("../middleware/middleware.js");           //to validate all end points
const verifyToken = require("../auth/verifyToken.js");


//add  
router.post('/add',verifyToken,salesRep.add);
//update
router.put('/update/:id',verifyToken,salesRep.update);    // request body validating
//delete
router.put('/delete/:id',verifyToken,salesRep.delete);
//getall
router.get('/',verifyToken,salesRep.getAll);
//getbyid
router.get('/:id',verifyToken,salesRep.getbyId);  
router.get('/monthlySales/:id',verifyToken,salesRep.monthlySales) ;
router.get('/rating/:id',verifyToken,salesRep.rating);

//router.get('/rate/:id',verifyToken,salesRep.rating);
module.exports = router;
