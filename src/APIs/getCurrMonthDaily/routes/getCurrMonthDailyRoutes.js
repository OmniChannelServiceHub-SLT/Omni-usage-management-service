const express = require('express');
const router = express.Router();

const { getCurrMonthDailyHandler } = require('../controllers/getCurrMonthDailyController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getCurrMonthDailyHandler);

module.exports = router;