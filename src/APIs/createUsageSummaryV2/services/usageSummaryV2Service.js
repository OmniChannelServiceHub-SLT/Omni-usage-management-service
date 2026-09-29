const Usage = require('../../../models/TMF635_UsageManagement');

async function getUsageSummaryV2(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getUsageSummaryV2 };