const express = require('express');
const router = express.Router();

const { listExtraGBPackagesHandler } = require('../controllers/extraGBPackagesController');
const { authenticate } = require('../../../middleware/authMiddleware');

router.get('/', authenticate, listExtraGBPackagesHandler);

module.exports = router;