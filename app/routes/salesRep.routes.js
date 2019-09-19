const express = require("express");
const router = express.Router();
const salesRep = require("../controllers/salesRep.controller.js");


//add 
router.post('/add',salesRep.add);
//update
router.put('/update/:id',salesRep.update);
//delete
router.delete('/delete/:id',salesRep.delete);
//getall
router.get('/',salesRep.getAll);
//getbyid
router.get('/:id',salesRep.getbyId);

module.exports =router;
