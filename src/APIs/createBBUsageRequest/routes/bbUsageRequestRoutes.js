const express = require("express");
const router = express.Router();
const { createBBUsageRequestHandler } = require("../controllers/bbUsageRequestController");

router.post("/", createBBUsageRequestHandler);

module.exports = router;