const { Usage } = require('../../../models/TMF635_UsageManagement');

// The source API uses billDate=01 while the sheet's sample value is 1,
// so both forms ("1" and "01") are accepted.
function billDateForms(billDate) {
  const n = String(Number(billDate));
  return [...new Set([String(billDate), n, n.padStart(2, '0')])];
}

async function getCurrMonthDaily(subscriberID, billDate) {
  const record = await Usage.findOne({
    usageType: 'CurrMonthDaily',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    usageCharacteristic: {
      $elemMatch: { name: 'billDate', value: { $in: billDateForms(billDate) } },
    },
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getCurrMonthDaily };