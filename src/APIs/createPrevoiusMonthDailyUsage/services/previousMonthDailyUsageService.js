const Usage = require('../../../models/TMF635_UsageManagement');

async function getPreviousMonthDailyUsage(subscriberId) {
  const now = new Date();
  const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageDate: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
  }).sort({ usageDate: 1 });

  return records;
}

module.exports = { getPreviousMonthDailyUsage };