const { getLTEFreeunitDetail } = require('../services/getLTEFreeunitDetailService');

async function getLTEFreeunitDetailHandler(req, res, next) {
  // The sheet spells the parameter "LTESLTNumber"; a lower-case form is accepted too.
  const LTESLTNumber = req.query.LTESLTNumber || req.query.ltesltnumber;

  if (!LTESLTNumber) {
    return res.status(400).json({
      isSuccess: false,
      errorMessege: 'LTESLTNumber query parameter is required',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'INVALID_REQUEST',
    });
  }

  try {
    const record = await getLTEFreeunitDetail(LTESLTNumber);

    if (!record || !record.mysltResponse) {
      return res.status(200).json({
        isSuccess: false,
        errorMessege: 'No free unit details found for this LTE number',
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

module.exports = { getLTEFreeunitDetailHandler };