const express = require('express');
const router = express.Router();

const { getExtraGBHandler } = require('../controllers/extraGBController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getExtraGBHandler);

module.exports = router;