const express = require('express');
const router = express.Router();

const { listOfferingExtraGbGbHandler } = require('../controllers/listOfferingExtraGbGbController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listOfferingExtraGbGbHandler);

module.exports = router;