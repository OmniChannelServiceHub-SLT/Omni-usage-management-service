const express = require('express');
const router = express.Router();

const { getBonusDataHandler } = require('../controllers/getBonusDataController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getBonusDataHandler);

module.exports = router;