const express = require('express');
const router = express.Router();
const distributor = require("../controllers/distributor.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/add',verifyToken,distributor.add);
router.put('/update/:id',verifyToken,distributor.update);
router.delete('/delete/:id',verifyToken,distributor.delete);
router.get('/',verifyToken,distributor.getAll);
router.get('/:id',verifyToken,distributor.getbyId);

module.exports = router;