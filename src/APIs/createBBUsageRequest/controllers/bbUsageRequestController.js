const { createBBUsageRequest } = require("../services/bbUsageRequestService");

const createBBUsageRequestHandler = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/tmf-api/usageManagement/v4/usage`;
    const usage = await createBBUsageRequest(req.body, baseUrl);
    return res.status(201).json(usage);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: statusCode,
      message: statusCode === 500 ? "Internal Server Error" : error.message
    });
  }
};

module.exports = { createBBUsageRequestHandler };