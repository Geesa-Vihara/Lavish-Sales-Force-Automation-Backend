const express = require("express");
const router = express.Router();
const salesRep = require("../controllers/salesRep.controller.js");
const schemas = require("../validation/schemas.js");
const middleware = require("../middleware/middleware.js");           //to validate all end points


//add  
router.post('/add',middleware(schemas.salesRep),salesRep.add);
//update
router.put('/update/:id',middleware(schemas.salesRep),salesRep.update);    // request body validating
//delete
router.delete('/delete/:id',salesRep.delete);
//getall
router.get('/',salesRep.getAll);
//getbyid
router.get('/:id',salesRep.getbyId);   

module.exports =router;
