const express = require("express");
const router = express.Router();
const { createExtraGBHandler } = require("../controllers/extraGBController");


router.post("/", createExtraGBHandler);

module.exports = router;