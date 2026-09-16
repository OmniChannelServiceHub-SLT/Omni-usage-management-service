const { getEnhancedCurrentDailyUsage } = require('../services/enhancedCurrentDailyUsageService');
const { toLegacyResponse, toTmfResponse } = require('../mappers/enhancedCurrentDailyUsageMapper');

async function getEnhancedCurrentDailyUsageHandler(req, res, next) {
  const { subscriberId } = req.query;

  if (!subscriberId) {
    return res.status(400).json({
      error: {
        code: 'INVALID_REQUEST',
        reason: 'subscriberId query parameter is required',
      },
    });
  }

  try {
    const records = await getEnhancedCurrentDailyUsage(subscriberId);

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(records));
    }

    return res.status(200).json(toTmfResponse(records));
  } catch (err) {
    next(err);
  }
}

module.exports = { getEnhancedCurrentDailyUsageHandler };