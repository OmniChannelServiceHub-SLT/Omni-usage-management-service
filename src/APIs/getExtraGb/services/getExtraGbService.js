const { Usage } = require('../../../models/TMF635_UsageManagement');

async function getExtraGb(subscriberID) {
  const record = await Usage.findOne({
    usageType: 'ExtraGb',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { getExtraGb };