const Usage = require('../../../models/TMF635_UsageManagement');

async function createBBUsageRequest(payload) {
  const {
    usageDate,
    usageType,
    usageSpecification,
    subscriberId,
    usageCharacteristic = [],
    legacyData,
  } = payload;

  const relatedParty = subscriberId
    ? [{ '@referredType': 'Subscriber', id: subscriberId }]
    : [];

  const doc = await Usage.create({
    usageDate,
    usageType,
    usageSpecification,
    relatedParty,
    usageCharacteristic,
    status: 'recorded',
    legacyData,
  });

  return doc;
}

module.exports = { createBBUsageRequest };