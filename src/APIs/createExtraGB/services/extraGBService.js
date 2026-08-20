const Usage = require("../../../models/TMF635_UsageManagement");


const createExtraGB = async (payload) => {
  const { subscriberID, gbAmount } = payload;

  if (!subscriberID) {
    const err = new Error("subscriberID is required");
    err.statusCode = 400;
    throw err;
  }

  if (!gbAmount || typeof gbAmount !== "number" || gbAmount <= 0) {
    const err = new Error("gbAmount is required and must be a positive number");
    err.statusCode = 400;
    throw err;
  }

  const usage = await Usage.create({
    status: "recognized",
    usageSpecification: {
      id: "EXTRA_GB_PURCHASE",
      name: "Extra GB Purchase"
    },
    relatedParty: [{ id: subscriberID, role: "Subscriber" }],
    usageCharacteristic: [{ name: "gbAmount", valueType: "number", value: gbAmount }]
  });

  return {
    id: usage._id.toString(),
    subscriberID,
    gbAmount,
    status: usage.status,
    date: usage.date
  };
};

module.exports = { createExtraGB };