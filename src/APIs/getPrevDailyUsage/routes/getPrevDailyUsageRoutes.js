const express = require('express');
const router = express.Router();

const { getPrevDailyUsageHandler } = require('../controllers/getPrevDailyUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getPrevDailyUsageHandler);

module.exports = router;