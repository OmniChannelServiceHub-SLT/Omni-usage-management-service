require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';

// Sample output taken from the XLSX (A41 BonusData)
const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    package_name: null,
    package_summary: { limit: 1.7, used: 1.7, volume_unit: 'GB' },
    usageDetails: [
      {
        name: 'Loyalty',
        limit: 1.7,
        remaining: 0.0,
        used: 1.7,
        percentage: 0.0,
        volume_unit: 'GB',
        expiry_date: '01-Oct',
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

  let spec = await UsageSpecification.findOne({ name: 'BonusData' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'BonusData',
      description: 'Bonus data usage for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'BonusData', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'BonusData',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'limit', value: 1.7 },
      { name: 'used', value: 1.7 },
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] BonusData spec: ${spec.id}`);
  console.log(`[SEED] BonusData usage for ${SUBSCRIBER_ID}: ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});