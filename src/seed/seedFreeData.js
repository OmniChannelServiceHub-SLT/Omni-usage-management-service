require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';

// Sample output taken from the XLSX (A42 FreeData).
// This is the "no free data" case: package_summary is null and usageDetails is empty.
const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    package_name: null,
    package_summary: null,
    usageDetails: [],
    reported_time: '2020-09-30T15:20:00',
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'FreeData' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'FreeData',
      description: 'Free data usage for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'FreeData', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'FreeData',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'reported_time', value: '2020-09-30T15:20:00' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] FreeData spec: ${spec.id}`);
  console.log(`[SEED] FreeData usage for ${SUBSCRIBER_ID}: ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});