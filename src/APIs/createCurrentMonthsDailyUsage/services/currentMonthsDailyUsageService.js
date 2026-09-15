const Usage = require('../../../models/TMF635_UsageManagement');

async function getCurrentMonthsDailyUsage(subscriberId) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
    usageDate: { $gte: startOfMonth },
  }).sort({ usageDate: 1 }); // ascending — daily usage reads more naturally oldest-to-newest

  return records;
}

module.exports = { getCurrentMonthsDailyUsage };