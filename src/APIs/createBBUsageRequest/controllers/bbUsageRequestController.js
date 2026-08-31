const { createBBUsageRequest } = require('../services/bbUsageRequestService');

function validateCreateBBUsageRequest(body) {
  const { subscriberId, usageType } = body;
  const errors = [];

  if (!subscriberId || typeof subscriberId !== 'string') {
    errors.push('subscriberId is required and must be a string');
  }

  if (!usageType || typeof usageType !== 'string') {
    errors.push('usageType is required and must be a string');
  }

  return errors;
}

async function createBBUsageRequestHandler(req, res, next) {
  const errors = validateCreateBBUsageRequest(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'INVALID_REQUEST',
        reason: 'Validation failed',
        details: errors,
      },
    });
  }

  try {
    const result = await createBBUsageRequest(req.body);
    res.status(201).json(result.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { createBBUsageRequestHandler };