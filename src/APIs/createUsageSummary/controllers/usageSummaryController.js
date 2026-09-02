const { getUsageSummary } = require('../services/usageSummaryService');

async function getUsageSummaryHandler(req, res, next) {
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
    const records = await getUsageSummary(subscriberId);
    res.status(200).json(records.map((r) => r.toJSON()));
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsageSummaryHandler };