const { Usage } = require('../../../models/TMF635_UsageManagement');

function normalize(name) {
  return String(name).trim().toUpperCase();
}

async function listOfferingExtraGbGb(subscriberID, basePackage) {
  const record = await Usage.findOne({
    usageType: 'OfferingExtraGbGb',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    usageCharacteristic: {
      $elemMatch: { name: 'basepackage', value: normalize(basePackage) },
    },
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { listOfferingExtraGbGb };