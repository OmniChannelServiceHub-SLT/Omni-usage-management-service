const Usage = require('../../../models/TMF635_UsageManagement');

async function getEnhancedPreviousDailyUsage(subscriberId) {
  const now = new Date();
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageDate: { $gte: startOfYesterday, $lt: startOfToday },
  }).sort({ usageDate: 1 });

  return records;
}

module.exports = { getEnhancedPreviousDailyUsage };