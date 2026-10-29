const { Usage } = require('../../../models/TMF635_UsageManagement');

// "1" and "01" are treated as the same value for billDate
function numberForms(value) {
  const n = String(Number(value));
  return [...new Set([String(value), n, n.padStart(2, '0')])];
}

async function getCurrentDailyUsage(subscriberID, billDate) {
  const record = await Usage.findOne({
    usageType: 'CurrentDailyUsage',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    usageCharacteristic: {
      $elemMatch: { name: 'billDate', value: { $in: numberForms(billDate) } },
    },
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getCurrentDailyUsage };