const Usage = require('../../../models/TMF635_UsageManagement');

async function getFreeData(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageType: 'freeData',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getFreeData };