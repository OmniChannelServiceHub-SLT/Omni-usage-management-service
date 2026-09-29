const express = require('express');
const router = express.Router();

const { listExtraGBPackagesMobileHandler } = require('../controllers/extraGBPackagesMobileController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listExtraGBPackagesMobileHandler);

module.exports = router;