const express = require('express');
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller");
const verifyToken = require("../auth/verifyToken.js");

router.get('/dailyorders',verifyToken,dashboard.dailyOrders);
router.get('/topcustomer',verifyToken,dashboard.topCustomer);
router.get('/topproduct',verifyToken,dashboard.topProduct);


module.exports = router;