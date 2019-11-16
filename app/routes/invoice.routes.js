const express =require("express");
const router = express.Router();
const invoice = require("../controllers/invoice.controller");
const verifyToken = require("../auth/verifyToken");

router.get('/',verifyToken,invoice.getAll);
router.get('/:id',verifyToken,invoice.getbyId);

module.exports=router;