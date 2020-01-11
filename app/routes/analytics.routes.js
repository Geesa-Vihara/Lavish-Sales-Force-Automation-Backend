const express = require('express');
const router = express.Router();
const analytics = require("../controllers/analytics.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/yearlysales',verifyToken,analytics.yearlySales);
router.get('/progress',verifyToken,analytics.progress);
router.post('/topproduct',verifyToken,analytics.topProduct);
router.post('/salesbyarea',verifyToken,analytics.salesByArea);



module.exports = router;