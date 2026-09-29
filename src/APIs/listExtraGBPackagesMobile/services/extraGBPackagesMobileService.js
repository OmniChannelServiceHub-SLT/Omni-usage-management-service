const { UsageSpecification } = require('../../../models/TMF635_UsageManagement');

async function listExtraGBPackagesMobile() {
  const records = await UsageSpecification.find({
    usageSpecCharacteristic: {
      $elemMatch: { name: 'channel', value: 'mobile' },
    },
  }).sort({ createdAt: 1 });

  return records;
}

module.exports = { listExtraGBPackagesMobile };