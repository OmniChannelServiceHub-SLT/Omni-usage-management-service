const { retrieveProtocol } = require('../services/retrieveProtocolService');

async function retrieveProtocolHandler(req, res, next) {
  const { subscriberID, date } = req.query;

  const errors = [];
  if (!subscriberID) {
    errors.push('subscriberID query parameter is required');
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
    errors.push('date query parameter is required in the form YYYY-MM-DD (for example 2020-12-28)');
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
    const record = await retrieveProtocol(subscriberID, date);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No protocol report found for this subscriber and date',
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

module.exports = { retrieveProtocolHandler };