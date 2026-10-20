const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getLTEFreeunitDetail(LTESLTNumber) {
  const record = await Usage.findOne({
    usageType: 'LTEFreeunitDetail',
    'relatedParty.id': LTESLTNumber,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getLTEFreeunitDetail };