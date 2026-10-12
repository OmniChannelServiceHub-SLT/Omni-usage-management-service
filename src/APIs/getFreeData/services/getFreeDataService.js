const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getFreeData(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'FreeData',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getFreeData };