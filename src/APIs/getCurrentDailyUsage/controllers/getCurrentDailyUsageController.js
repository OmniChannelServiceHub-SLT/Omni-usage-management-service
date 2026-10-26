const { getCurrentDailyUsage } = require('../services/getCurrentDailyUsageService');

async function getCurrentDailyUsageHandler(req, res, next) {
  const { subscriberID, billDate } = req.query;

  const errors = [];
  if (!subscriberID) {
    errors.push('subscriberID query parameter is required');
  }
  if (!billDate || !/^\d{1,2}$/.test(String(billDate))) {
    errors.push('billDate query parameter is required (for example 01)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      isSuccess: false,
      errorMessege: errors.join('; '),
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'INVALID_REQUEST',
    });
  }

  try {
    const record = await getCurrentDailyUsage(subscriberID, billDate);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No current daily usage found for this subscriber and bill date',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: null,
        errorCode: 'NOT_FOUND',
      });
    }

    // Stored MySLT response is returned exactly as saved
    return res.status(200).json(record.mysltResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCurrentDailyUsageHandler };