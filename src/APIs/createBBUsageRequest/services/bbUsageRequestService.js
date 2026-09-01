const ProductUsage = require('../../../models/TMF635_UsageManagement');

async function createBBUsageRequest(payload) {
  const { subscriberId, usageType, characteristics = [] } = payload;

  const usageCharacteristic = characteristics.map((c) => ({
    name: c.name,
    value: c.value,
  }));

  const doc = await ProductUsage.create({
    usageType,
    status: 'received',
    usageCharacteristic,
    externalIdentifier: [
      {
        owner: 'SLT-OMNI',
        externalIdentifierType: 'subscriberId',
        id: subscriberId,
      },
    ],
  });

  return doc;
}

module.exports = { createBBUsageRequest };