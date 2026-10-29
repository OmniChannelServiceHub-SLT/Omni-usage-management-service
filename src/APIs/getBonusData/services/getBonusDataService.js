const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getBonusData(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'BonusData',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getBonusData };