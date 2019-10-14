const express = require('express');
const router = express.Router();
const customer = require("../controllers/customer.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/add',verifyToken,customer.add);
router.put('/update/:id',verifyToken,customer.update);
router.delete('/delete/:id',verifyToken,customer.delete);
router.get('/',verifyToken,customer.getAll);
router.get('/:id',verifyToken,customer.getbyId);

module.exports = router;