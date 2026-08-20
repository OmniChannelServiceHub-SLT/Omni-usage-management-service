const express = require("express");
const router = express.Router();
const { createUsageSummaryHandler } = require("../controllers/usageSummaryController");


router.get("/", createUsageSummaryHandler);

module.exports = router;