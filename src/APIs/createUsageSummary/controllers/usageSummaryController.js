const { getUsageSummary } = require("../services/usageSummaryService");


const createUsageSummaryHandler = async (req, res) => {
  try {
    const { subscriberID } = req.query;
    const dataBundle = await getUsageSummary(subscriberID);

    return res.status(200).json({
      isSuccess: true,
      errorMessege: null,
      exceptionDetail: null,
      dataBundle,
      errorShow: null,
      errorCode: null
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      isSuccess: false,
      errorMessege: statusCode === 500 ? "Internal Server Error" : error.message,
      exceptionDetail: statusCode === 500 ? error.message : null,
      dataBundle: null,
      errorShow: true,
      errorCode: statusCode
    });
  }
};

module.exports = { createUsageSummaryHandler };