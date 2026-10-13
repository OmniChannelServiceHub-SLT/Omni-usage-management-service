require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';

// Sample output taken from the XLSX (A51 WeeksUsage).
// This API has no isSuccess/dataBundle wrapper: the plain object is the response.
// The sample holds one day (2019-05-01) with all values zero.
const mysltResponse = {
  showFourColumns: false,
  dailylist: [
    {
      date: '2019-05-01',
      displaydate: 'May-01',
      volumeunit: 'GB',
      totalusage: '0.0',
      standardusage: '0.0',
      freeusage: '0.0',
      peakdownload: null,
      offpeakdownload: null,
      peakupload: null,
      offpeakupload: null,
      totalpercentage: 0,
      standardpercentage: 0,
      peakdownloadpercentage: 0,
      offpeakdownloadpercentage: 0,
      peakuploadpercentage: 0,
      offpeakuploadpercentage: 0,
      error_record: false,
    },
  ],
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'WeeksUsage' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'WeeksUsage',
      description: 'Weekly daily-usage list for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'WeeksUsage', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'WeeksUsage',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] WeeksUsage spec: ${spec.id}`);
  console.log(`[SEED] WeeksUsage usage for ${SUBSCRIBER_ID}: ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});