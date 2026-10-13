require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';

// Sample output taken from the XLSX (A39 UsageSummary).
const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    status: 'NORMAL',
    reported_time: '2020-09-03T12:42:00',
    my_package_summary: { limit: 90.0, used: 1.1, volume_unit: 'GB' },
    bonus_data_summary: { limit: 1.7, used: 1.7, volume_unit: 'GB' },
    free_data_summary: null,
    vas_data_summary: null,
    extra_gb_data_summary: { limit: 3.0, used: 2.0, volume_unit: 'GB' },
    my_package_info: {
      package_name: 'WEB FAMILY PLUS',
      package_summary: null,
      usageDetails: [
        {
          name: 'Standard',
          limit: 36.0,
          remaining: 35.3,
          used: 0.7,
          percentage: 98.0,
          volume_unit: 'GB',
          expiry_date: '30-Sep',
        },
        {
          name: 'Total (Standard + Free)',
          limit: 90.0,
          remaining: 88.9,
          used: 1.1,
          percentage: 99.0,
          volume_unit: 'GB',
          expiry_date: '30-Sep',
        },
      ],
    },
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'UsageSummary' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'UsageSummary',
      description: 'Usage summary for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'UsageSummary', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'UsageSummary',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'status', value: 'NORMAL' },
      { name: 'package_name', value: 'WEB FAMILY PLUS' },
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] UsageSummary spec: ${spec.id}`);
  console.log(`[SEED] UsageSummary usage for ${SUBSCRIBER_ID}: ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});