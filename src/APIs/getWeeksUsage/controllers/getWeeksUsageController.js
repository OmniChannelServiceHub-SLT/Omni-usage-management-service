const { getWeeksUsage } = require('../services/getWeeksUsageService');

async function getWeeksUsageHandler(req, res, next) {
  const { subscriberID } = req.query;

  if (!subscriberID) {
    return res.status(400).json({
      isSuccess: false,
      errorMessege: 'subscriberID query parameter is required',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'INVALID_REQUEST',
    });
  }

  try {
    const record = await getWeeksUsage(subscriberID);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No weekly usage found for this subscriber',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: null,
        errorCode: 'NOT_FOUND',
      });
    }

    // Success: the stored MySLT response (showFourColumns + dailylist) is returned as saved,
    // with no isSuccess/dataBundle wrapper, as in the XLSX sample.
    return res.status(200).json(record.mysltResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = { getWeeksUsageHandler };