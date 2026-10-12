const express = require('express');
const router = express.Router();

const { getFreeDataHandler } = require('../controllers/getFreeDataController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getFreeDataHandler);

module.exports = router;