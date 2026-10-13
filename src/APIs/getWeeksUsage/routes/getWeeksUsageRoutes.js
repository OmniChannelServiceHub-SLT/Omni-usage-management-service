const express = require('express');
const router = express.Router();

const { getWeeksUsageHandler } = require('../controllers/getWeeksUsageController');
const { authenticate } = require('../../../middleware/authMiddleware');

console.log(typeof getWeeksUsageHandler, typeof authenticate);

router.get('/', authenticate, getWeeksUsageHandler);

module.exports = router;