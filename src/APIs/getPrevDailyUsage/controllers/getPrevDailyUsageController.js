const { getPrevDailyUsage } = require('../services/getPrevDailyUsageService');

async function getPrevDailyUsageHandler(req, res, next) {
  const { subscriberID, billDate, monthIndex } = req.query;

  const errors = [];
  if (!subscriberID) {
    errors.push('subscriberID query parameter is required');
  }
  if (!billDate || !/^\d{1,2}$/.test(String(billDate))) {
    errors.push('billDate query parameter is required (for example 01)');
  }
  if (!monthIndex || !/^\d{1,2}$/.test(String(monthIndex))) {
    errors.push('monthIndex query parameter is required (for example 1)');
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
    const record = await getPrevDailyUsage(subscriberID, billDate, monthIndex);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No previous daily usage found for this subscriber, bill date and month index',
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

module.exports = { getPrevDailyUsageHandler };