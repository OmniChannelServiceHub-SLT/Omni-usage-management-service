const { Usage } = require('../../../models/TMF635_UsageManagement');

async function retrieveProtocol(subscriberID, date) {
  const record = await Usage.findOne({
    usageType: 'Protocol',
    'relatedParty.id': subscriberID,
    'relatedParty.@referredType': 'Subscriber',
    usageCharacteristic: {
      $elemMatch: { name: 'date', value: date },
    },
  }).sort({ createdAt: -1 });

  return record;
}

module.exports = { retrieveProtocol };