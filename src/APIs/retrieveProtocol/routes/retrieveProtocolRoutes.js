const express = require('express');
const router = express.Router();

const { retrieveProtocolHandler } = require('../controllers/retrieveProtocolController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, retrieveProtocolHandler);

module.exports = router;