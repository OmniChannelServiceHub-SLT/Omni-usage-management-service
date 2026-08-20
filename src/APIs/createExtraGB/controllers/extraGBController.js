const { createExtraGB } = require("../services/extraGBService");

const createExtraGBHandler = async (req, res) => {
  try {
    const dataBundle = await createExtraGB(req.body);

    return res.status(201).json({
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

module.exports = { createExtraGBHandler };