const express = require('express');
const router = express.Router();

const { getCurrentMonthsDailyUsageHandler } = require('../controllers/currentMonthsDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getCurrentMonthsDailyUsageHandler);

module.exports = router;