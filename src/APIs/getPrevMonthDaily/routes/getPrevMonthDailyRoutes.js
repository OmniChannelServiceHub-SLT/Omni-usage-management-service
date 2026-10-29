const express = require('express');
const router = express.Router();

const { getPrevMonthDailyHandler } = require('../controllers/getPrevMonthDailyController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getPrevMonthDailyHandler);

module.exports = router;