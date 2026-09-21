const {
  createUsageSpecification,
  listUsageSpecifications,
  getUsageSpecificationById,
} = require('../services/usageSpecificationService');

const {
  toLegacyResponse,
  toLegacyListResponse,
  toTmfResponse,
  toTmfListResponse,
} = require('../mappers/usageSpecificationMapper');

function validateCreateUsageSpecification(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string') {
    errors.push('name is required and must be a string'); // mandatory per conformance profile
  }
  return errors;
}

async function createUsageSpecificationHandler(req, res, next) {
  const errors = validateCreateUsageSpecification(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: { code: 'INVALID_REQUEST', reason: 'Validation failed', details: errors },
    });
  }

  try {
    const result = await createUsageSpecification(req.body);

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

async function listUsageSpecificationsHandler(req, res, next) {
  try {
    const results = await listUsageSpecifications();

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyListResponse(results));
    }

    return res.status(200).json(toTmfListResponse(results));
  } catch (err) {
    next(err);
  }
}

async function getUsageSpecificationByIdHandler(req, res, next) {
  try {
    const result = await getUsageSpecificationById(req.params.id);

    if (!result) {
      if (req.headers['x-response-format'] === 'legacy') {
        return res.status(200).json(toLegacyResponse(null));
      }
      return res.status(404).json({ error: { code: 'NOT_FOUND', reason: 'UsageSpecification not found' } });
    }

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(result));
    }

    return res.status(200).json(toTmfResponse(result));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUsageSpecificationHandler,
  listUsageSpecificationsHandler,
  getUsageSpecificationByIdHandler,
};