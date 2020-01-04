const express = require('express');
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller");
const verifyToken = require("../auth/verifyToken.js");

router.get('/dailyorders',verifyToken,dashboard.dailyOrders);

module.exports = router;