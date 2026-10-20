const express = require('express');
const router = express.Router();

const { getLTEFreeunitDetailHandler } = require('../controllers/getLTEFreeunitDetailController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, getLTEFreeunitDetailHandler);

module.exports = router;