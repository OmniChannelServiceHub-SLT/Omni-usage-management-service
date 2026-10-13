const { listOfferingExtraGb } = require('../services/listOfferingExtraGbService');

async function listOfferingExtraGbHandler(req, res, next) {
  const { subscriberID, packageName } = req.query;

  const errors = [];
  if (!subscriberID) {
    errors.push('subscriberID query parameter is required');
  }
  if (!packageName || !String(packageName).trim()) {
    errors.push('packageName query parameter is required (for example WEB FAMILY PLUS)');
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
    const record = await listOfferingExtraGb(subscriberID, packageName);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No extra GB packages found for this subscriber and package name',
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

module.exports = { listOfferingExtraGbHandler };