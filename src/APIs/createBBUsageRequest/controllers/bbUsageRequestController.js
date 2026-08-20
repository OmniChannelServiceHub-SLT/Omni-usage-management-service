const { createBBUsageRequest } = require("../services/bbUsageRequestService");

const createBBUsageRequestHandler = async (req, res) => {
  try {
    await createBBUsageRequest(req.body);

    return res.status(200).json({
      isSuccess: true,
      errorMessege: null,
      exceptionDetail: null,
      dataBundle: {
        status: "SUCCESS",
        message: "Success",
        path: ""
      },
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

module.exports = { createBBUsageRequestHandler };