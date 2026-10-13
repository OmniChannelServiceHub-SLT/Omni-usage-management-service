const { Usage } = require('../../../models/TMF635_UsageManagement');

// Package names are matched ignoring case and surrounding spaces
function normalize(name) {
  return String(name).trim().toUpperCase();
}

async function listOfferingExtraGb(subscriberID, packageName) {
  const record = await Usage.findOne({
    usageType: 'OfferingExtraGb',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    usageCharacteristic: {
      $elemMatch: { name: 'packageName', value: normalize(packageName) },
    },
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { listOfferingExtraGb };