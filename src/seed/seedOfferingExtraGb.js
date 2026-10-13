require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';
const PACKAGE_NAME = 'WEB FAMILY PLUS';

// Sample output taken from the XLSX (A45 GetExtraGBPackages): 11 extra-GB packages.
// Each row is [packageId, volume, price, taxValue]; post and pre price are the same in the sample.
const PACKAGES = [
  [1, 1, '100', '10.2032'],
  [3, 2, '200', '20.4064'],
  [5, 3, '300', '30.609602'],
  [9, 5, '425', '43.3636'],
  [11, 6, '510', '52.036324'],
  [13, 7, '595', '60.70904'],
  [15, 8, '680', '69.38176'],
  [17, 9, '765', '78.05448'],
  [19, 10, '850', '86.7272'],
  [29, 15, '1275', '130.0908'],
  [39, 20, '1500', '153.048'],
];

const dataBundle = PACKAGES.map(([packageId, volume, price, taxValue]) => ({
  packageId,
  vasPackageType: 'VODV',
  volume,
  postPrice: price,
  prePrice: price,
  taxValue,
  validPeriod: 60,
  periodUnit: 'Days',
  description: ' ',
  volumeUnit: 'GB',
  pre_paid_allowed: false,
  post_paid_allowed: false,
}));

const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle,
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'OfferingExtraGb' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'OfferingExtraGb',
      description: 'Extra GB package offerings for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'OfferingExtraGb', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'OfferingExtraGb',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'packageName', value: PACKAGE_NAME },
      { name: 'packageCount', value: PACKAGES.length },
    ],
    mysltResponse,
  });

  console.log(`[SEED] OfferingExtraGb spec: ${spec.id}`);
  console.log(`[SEED] OfferingExtraGb usage for ${SUBSCRIBER_ID} (${PACKAGE_NAME}, ${PACKAGES.length} packages): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});