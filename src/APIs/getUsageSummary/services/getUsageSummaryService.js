const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getUsageSummary(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'UsageSummary',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getUsageSummary };