const { listExtraGBPackagesMobile } = require('../services/extraGBPackagesMobileService');
const { toLegacyResponse, toTmfResponse } = require('../mappers/extraGBPackagesMobileMapper');

async function listExtraGBPackagesMobileHandler(req, res, next) {
  try {
    const records = await listExtraGBPackagesMobile();

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(records));
    }

    return res.status(200).json(toTmfResponse(records));
  } catch (err) {
    next(err);
  }
}

module.exports = { listExtraGBPackagesMobileHandler };