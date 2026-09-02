const Usage = require('../../../models/TMF635_UsageManagement');

async function getBonusData(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageType: 'bonusData',
  }).sort({ createdAt: -1 });

  return records;
}

module.exports = { getBonusData };