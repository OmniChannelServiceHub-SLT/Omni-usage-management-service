const express = require('express');
const router = express.Router();

const { getEnhancedPreviousDailyUsageHandler } = require('../controllers/enhancedPreviousDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getEnhancedPreviousDailyUsageHandler);

module.exports = router;