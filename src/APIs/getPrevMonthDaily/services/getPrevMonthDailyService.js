const { Usage } = require('../../../models/TMF635_UsageManagement');

function numberForms(value) {
  const n = String(Number(value));
  return [...new Set([String(value), n, n.padStart(2, '0')])];
}

async function getPrevMonthDaily(subscriberID, billDate, monthIndex) {
  const record = await Usage.findOne({
    usageType: 'PrevMonthDaily',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    $and: [
      { usageCharacteristic: { $elemMatch: { name: 'billDate', value: { $in: numberForms(billDate) } } } },
      { usageCharacteristic: { $elemMatch: { name: 'monthIndex', value: { $in: numberForms(monthIndex) } } } },
    ],
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getPrevMonthDaily };