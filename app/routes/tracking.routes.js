const express = require('express');
const router = express.Router();
const tracking = require("../controllers/tracking.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/getmarkers',verifyToken,tracking.getMarkers);


module.exports = router;