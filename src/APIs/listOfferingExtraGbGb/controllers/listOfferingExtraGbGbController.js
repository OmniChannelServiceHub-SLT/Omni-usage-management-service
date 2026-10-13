const { listOfferingExtraGbGb } = require('../services/listOfferingExtraGbGbService');

async function listOfferingExtraGbGbHandler(req, res, next) {
  // The sheet spells the parameters in lower case; the camel-case forms are accepted too.
  const subscriberID = req.query.subscriberid || req.query.subscriberID;
  const basePackage = req.query.basepackage || req.query.basePackage;

  const errors = [];
  if (!subscriberID) {
    errors.push('subscriberid query parameter is required');
  }
  if (!basePackage || !String(basePackage).trim()) {
    errors.push('basepackage query parameter is required (for example WEB FAMILY PLUS)');
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
    const record = await listOfferingExtraGbGb(subscriberID, basePackage);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No extra GB packages found for this subscriber and base package',
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

module.exports = { listOfferingExtraGbGbHandler };