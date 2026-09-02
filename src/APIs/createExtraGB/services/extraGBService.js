const Usage = require('../../../models/TMF635_UsageManagement');

async function getExtraGBUsage(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageType: 'extraGB',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getExtraGBUsage };