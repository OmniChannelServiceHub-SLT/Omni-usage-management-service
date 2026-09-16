const Usage = require('../../../models/TMF635_UsageManagement');

async function getUsageSummary(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getUsageSummary };