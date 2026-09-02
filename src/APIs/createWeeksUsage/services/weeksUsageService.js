const Usage = require('../../../models/TMF635_UsageManagement');

async function getWeeksUsage(subscriberId) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageDate: { $gte: sevenDaysAgo },
  }).sort({ usageDate: -1 });

  return records;
}

module.exports = { getWeeksUsage };