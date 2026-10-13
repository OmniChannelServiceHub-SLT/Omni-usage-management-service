const express = require('express');
const router = express.Router();

const { listUsageReportHandler } = require('../controllers/listUsageReportController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listUsageReportHandler);

module.exports = router;