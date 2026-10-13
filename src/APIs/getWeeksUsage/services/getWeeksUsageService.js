const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getWeeksUsage(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'WeeksUsage',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getWeeksUsage };