const express = require("express");
const router = express.Router();
const salesRep = require("../controllers/salesRep.controller.js");
const schemas = require("../validation/schemas.js");
const middleware = require("../middleware/middleware.js");           //to validate all end points
const verifyToken = require("../auth/verifyToken.js");


//add  
router.post('/add',verifyToken,middleware(schemas.salesRep),salesRep.add);
//update
router.put('/update/:id',middleware(schemas.salesRep),salesRep.update);    // request body validating
//delete
router.delete('/delete/:id',verifyToken,salesRep.delete);
//getall
router.get('/',verifyToken,salesRep.getAll);
//getbyid
router.get('/:id',salesRep.getbyId);   

module.exports =router;
