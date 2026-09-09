const { createBBUsageRequest } = require('../services/bbUsageRequestService');
const { toLegacyResponse, toTmfResponse } = require('../mappers/bbUsageRequestMapper');

function validateBBUsageRequest(body) {
  const errors = [];
  const { usageDate, usageType, usageSpecification } = body;

  if (!usageDate) {
    errors.push('usageDate is required');
  }

  if (!usageType || typeof usageType !== 'string') {
    errors.push('usageType is required and must be a string');
  }

  if (!usageSpecification || !usageSpecification.id) {
    errors.push('usageSpecification.id is required');
  }

  return errors;
}

async function createBBUsageRequestHandler(req, res, next) {
  const errors = validateBBUsageRequest(req.body);

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

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(result));
    }

    const tmfBody = toTmfResponse(result);
    res.set('Location', tmfBody.href);
    return res.status(201).json(tmfBody);
  } catch (err) {
    next(err);
  }
}

module.exports = { createBBUsageRequestHandler };