const express = require('express');
const router = express.Router();
const reports = require("../controllers/reports.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/generateRep',verifyToken,reports.generateRep);
router.post('/byDist',verifyToken,reports.byDist);

module.exports = router;