const { UsageSpecification } = require('../../../models/TMF635_UsageManagement');

async function listExtraGBPackages() {
  const records = await UsageSpecification.find({
    'usageSpecCharacteristic': {
      $elemMatch: { name: 'vasPackageType', value: 'VODV' },
    },
  }).sort({ createdAt: 1 });

  return records;
}

module.exports = { listExtraGBPackages };