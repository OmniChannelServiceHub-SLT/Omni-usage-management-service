require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

// Sample subscriber and base package from the XLSX (A64 GetExtraGBPackagesMobile).
const SUBSCRIBER_ID = '94312238691';
const BASE_PACKAGE = 'WEB FAMILY PLUS';

// PLACEHOLDER RESPONSE.
// The XLSX has no sample output for A64 ("Not specified in source").
// The shape below is borrowed from A45 GetExtraGBPackages, and the three packages are a guess.
// When the real sample arrives from the lead, replace the response below and run:
// npm run seed:offeringextragbgb
const PACKAGES = [
  [1, 1, '100', '10.2032'],
  [3, 2, '200', '20.4064'],
  [5, 3, '300', '30.609602'],
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

  let spec = await UsageSpecification.findOne({ name: 'OfferingExtraGbGb' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'OfferingExtraGbGb',
      description: 'Extra GB package offerings for a mobile subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'OfferingExtraGbGb', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'OfferingExtraGbGb',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'basepackage', value: BASE_PACKAGE },
      { name: 'placeholderResponse', value: true },
    ],
    mysltResponse,
  });

  console.log(`[SEED] OfferingExtraGbGb spec: ${spec.id}`);
  console.log(`[SEED] OfferingExtraGbGb usage for ${SUBSCRIBER_ID} (${BASE_PACKAGE}, placeholder response): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});