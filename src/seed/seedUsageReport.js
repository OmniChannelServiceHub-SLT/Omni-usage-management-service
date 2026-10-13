require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

// The XLSX gives no sample subscriber for A63, so the usual test subscriber is used.
const SUBSCRIBER_ID = '94382222802';

// PLACEHOLDER RESPONSE.
// The XLSX has no sample output for A63 GetReportTimePeriod ("source references missing sheet 63").
// This list of reporting periods is a guess. When the real sample arrives from the lead,
// replace the response below and run: npm run seed:usagereport
const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: ['Current Month', 'Previous Month', 'Last 7 Days'],
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'UsageReport' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'UsageReport',
      description: 'Reporting periods available to a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'UsageReport', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'UsageReport',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'placeholderResponse', value: true },
    ],
    mysltResponse,
  });

  console.log(`[SEED] UsageReport spec: ${spec.id}`);
  console.log(`[SEED] UsageReport usage for ${SUBSCRIBER_ID} (placeholder response): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});