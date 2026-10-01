const { getUsageSummaryV2 } = require('../services/usageSummaryV2Service');
const { toLegacyResponse, toTmfResponse } = require('../mappers/usageSummaryV2Mapper');

async function getUsageSummaryV2Handler(req, res, next) {
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
    const records = await getUsageSummaryV2(subscriberId);

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(records));
    }

    return res.status(200).json(toTmfResponse(records));
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsageSummaryV2Handler };