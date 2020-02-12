const express = require('express');
const router = express.Router();
const analytics = require("../controllers/analytics.controller");
const verifyToken = require("../auth/verifyToken.js");

router.post('/yearlysales',verifyToken,analytics.yearlySales);
router.get('/progress',verifyToken,analytics.progress);
router.post('/topproduct',verifyToken,analytics.topProduct);
router.post('/salesbyarea',verifyToken,analytics.salesByArea);
router.post('/routecoverage',verifyToken,analytics.routeCoverage);
router.post('/topOutlet',verifyToken,analytics.topOutlet);
router.get('/topBestSalesrep',verifyToken,analytics.topBestSalesrep);
router.get('/topLeastSalesrep',verifyToken,analytics.topLeastSalesrep);



module.exports = router;