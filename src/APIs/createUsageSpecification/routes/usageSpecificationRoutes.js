const express = require('express');
const router = express.Router();

const {
  createUsageSpecificationHandler,
  listUsageSpecificationsHandler,
  getUsageSpecificationByIdHandler,
} = require('../controllers/usageSpecificationController');

const { authenticate } = require('../../../middleware/authMiddleware');

router.post('/', authenticate, createUsageSpecificationHandler);
router.get('/', authenticate, listUsageSpecificationsHandler);
router.get('/:id', authenticate, getUsageSpecificationByIdHandler);

module.exports = router;