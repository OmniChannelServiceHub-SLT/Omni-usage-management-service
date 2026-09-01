const express = require('express');
const router = express.Router();

const { createBBUsageRequestHandler } = require('../controllers/bbUsageRequestController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.post('/', authenticate, createBBUsageRequestHandler);

module.exports = router;