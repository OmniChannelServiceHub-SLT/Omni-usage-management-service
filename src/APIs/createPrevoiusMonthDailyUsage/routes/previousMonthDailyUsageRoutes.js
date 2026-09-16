const express = require('express');
const router = express.Router();

const { getPreviousMonthDailyUsageHandler } = require('../controllers/previousMonthDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getPreviousMonthDailyUsageHandler);

module.exports = router;