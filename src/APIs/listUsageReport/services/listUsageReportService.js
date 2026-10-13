const { Usage } = require('../../../models/TMF635_UsageManagement');

async function listUsageReport(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'UsageReport',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { listUsageReport };