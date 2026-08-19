const Usage = require("../../../models/TMF635_Usage");

const createBBUsageRequest = async (payload, baseUrl) => {
  const { subscriberID, accountNo, serviceNo, usageCharacteristic } = payload;

  if (!subscriberID) {
    const err = new Error("subscriberID is required");
    err.statusCode = 400;
    throw err;
  }

  const characteristics = Array.isArray(usageCharacteristic)
    ? [...usageCharacteristic]
    : [];

  if (accountNo) characteristics.push({ name: "accountNo", value: accountNo });
  if (serviceNo) characteristics.push({ name: "serviceNo", value: serviceNo });

  const usage = await Usage.create({
    relatedParty: [{ id: subscriberID, role: "Subscriber" }],
    usageCharacteristic: characteristics
  });

  return usage.toTMF(baseUrl);
};

module.exports = { createBBUsageRequest };