const express = require('express');
const router = express.Router();

const { getEnhancedCurrentDailyUsageHandler } = require('../controllers/enhancedCurrentDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getEnhancedCurrentDailyUsageHandler);

module.exports = router;