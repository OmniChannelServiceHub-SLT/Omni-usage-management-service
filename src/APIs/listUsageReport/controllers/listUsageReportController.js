const { listUsageReport } = require('../services/listUsageReportService');

async function listUsageReportHandler(req, res, next) {
  // The sheet spells the parameter "subscriberid"; the other APIs use "subscriberID". Both are accepted.
  const subscriberID = req.query.subscriberid || req.query.subscriberID;

  if (!subscriberID) {
    return res.status(400).json({
      isSuccess: false,
      errorMessege: 'subscriberid query parameter is required',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'INVALID_REQUEST',
    });
  }

  try {
    const record = await listUsageReport(subscriberID);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No report periods found for this subscriber',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: null,
        errorCode: 'NOT_FOUND',
      });
    }

    // Stored response is returned exactly as saved
    return res.status(200).json(record.mysltResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsageReportHandler };