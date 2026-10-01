const { listExtraGBPackages } = require('../services/extraGBPackagesService');
const { toLegacyResponse, toTmfResponse } = require('../mappers/extraGBPackagesMapper');

async function listExtraGBPackagesHandler(req, res, next) {
  try {
    const records = await listExtraGBPackages();

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(200).json(toLegacyResponse(records));
    }

    return res.status(200).json(toTmfResponse(records));
  } catch (err) {
    next(err);
  }
}

module.exports = { listExtraGBPackagesHandler };