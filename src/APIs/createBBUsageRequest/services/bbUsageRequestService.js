const Usage = require("../../../models/TMF635_UsageManagement");

const createBBUsageRequest = async (payload) => {
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

  await Usage.create({
    relatedParty: [{ id: subscriberID, role: "Subscriber" }],
    usageCharacteristic: characteristics
  });

  // Nothing else to return — the documented response only confirms success
  return true;
};

module.exports = { createBBUsageRequest };