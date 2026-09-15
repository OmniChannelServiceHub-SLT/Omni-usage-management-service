const Usage = require('../../../models/TMF635_UsageManagement');

async function getEnhancedCurrentDailyUsage(subscriberId) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageDate: { $gte: startOfToday, $lt: startOfTomorrow },
  }).sort({ usageDate: 1 });

  return records;
}

module.exports = { getEnhancedCurrentDailyUsage };