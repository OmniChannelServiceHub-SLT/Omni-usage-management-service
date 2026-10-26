const express = require('express');
const router = express.Router();

const { getCurrentDailyUsageHandler } = require('../controllers/getCurrentDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getCurrentDailyUsageHandler);

module.exports = router;