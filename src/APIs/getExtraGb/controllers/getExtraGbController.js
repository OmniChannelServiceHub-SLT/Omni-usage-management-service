const { getExtraGb } = require('../services/getExtraGbService');

async function getExtraGbHandler(req, res, next) {
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
    const record = await getExtraGb(subscriberID);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No extra GB usage found for this subscriber',
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

module.exports = { getExtraGbHandler };