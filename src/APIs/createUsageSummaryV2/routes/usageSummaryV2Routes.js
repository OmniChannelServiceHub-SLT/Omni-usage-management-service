const express = require('express');
const router = express.Router();

const { getUsageSummaryV2Handler } = require('../controllers/usageSummaryV2Controller');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getUsageSummaryV2Handler);

module.exports = router;