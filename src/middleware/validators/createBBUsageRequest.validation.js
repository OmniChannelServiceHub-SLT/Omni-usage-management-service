function validateCreateBBUsageRequest(req, res, next) {
  const { subscriberId, usageType } = req.body;

  const errors = [];

  if (!subscriberId || typeof subscriberId !== 'string') {
    errors.push('subscriberId is required and must be a string');
  }

  if (!usageType || typeof usageType !== 'string') {
    errors.push('usageType is required and must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'INVALID_REQUEST',
        reason: 'Validation failed',
        details: errors,
      },
    });
  }

  next();
}

module.exports = validateCreateBBUsageRequest;