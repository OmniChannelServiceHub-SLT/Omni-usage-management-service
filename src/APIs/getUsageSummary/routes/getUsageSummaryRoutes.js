const express = require('express');
const router = express.Router();

const { getUsageSummaryHandler } = require('../controllers/getUsageSummaryController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getUsageSummaryHandler);

module.exports = router;