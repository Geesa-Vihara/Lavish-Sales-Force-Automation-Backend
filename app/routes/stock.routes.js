const express = require('express');
const router = express.Router();
const stock = require("../controllers/stock.controller");
const verifyToken = require("../auth/verifyToken.js");

router.get('/',verifyToken,stock.getAll);
router.get('/:id',verifyToken,stock.getById);

module.exports = router;