require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

// Sample subscriber from the XLSX (A40 ExtraGB).
const SUBSCRIBER_ID = '94112086603';

// Sample output taken from the XLSX (A40 ExtraGB).
const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    package_name: null,
    package_summary: { limit: 20.0, used: 0.0, volume_unit: 'GB' },
    usageDetails: [
      {
        name: 'Extra GB - 20 GB',
        limit: 20.0,
        remaining: 20.0,
        used: 0.0,
        percentage: 100.0,
        volume_unit: 'GB',
        expiry_date: '01-Nov',
        claim: null,
        unsubscribable: false,
        timestamp: 0.0,
        subscriptionid: null,
      },
    ],
    reported_time: '2020-09-30T15:03:00',
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'ExtraGb' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'ExtraGb',
      description: 'Extra GB usage for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'ExtraGb', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'ExtraGb',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'limit', value: 20.0 },
      { name: 'used', value: 0.0 },
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] ExtraGb spec: ${spec.id}`);
  console.log(`[SEED] ExtraGb usage for ${SUBSCRIBER_ID}: ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});