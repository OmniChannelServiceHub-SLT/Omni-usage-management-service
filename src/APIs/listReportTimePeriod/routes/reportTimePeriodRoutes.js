const express = require('express');
const router = express.Router();

const { listReportTimePeriodHandler } = require('../controllers/reportTimePeriodController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listReportTimePeriodHandler);

module.exports = router;