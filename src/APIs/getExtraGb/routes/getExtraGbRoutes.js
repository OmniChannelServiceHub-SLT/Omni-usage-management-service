const express = require('express');
const router = express.Router();

const { getExtraGbHandler } = require('../controllers/getExtraGbController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getExtraGbHandler);

module.exports = router;