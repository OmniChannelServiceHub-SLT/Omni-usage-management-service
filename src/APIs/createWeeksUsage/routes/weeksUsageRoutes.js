const express = require('express');
const router = express.Router();

const { getWeeksUsageHandler } = require('../controllers/weeksUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getWeeksUsageHandler);

module.exports = router;