const express = require('express');
const router = express.Router();

const { listOfferingExtraGbHandler } = require('../controllers/listOfferingExtraGbController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listOfferingExtraGbHandler);

module.exports = router;