const ProductUsage = require('../../../models/TMF635_UsageManagement');

async function getUsageSummary(subscriberId) {
  const records = await ProductUsage.find({
    'externalIdentifier.id': subscriberId,
    'externalIdentifier.externalIdentifierType': 'subscriberId',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getUsageSummary };