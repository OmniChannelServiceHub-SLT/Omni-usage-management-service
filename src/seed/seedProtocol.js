require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

// Sample values from the XLSX (A85 ProtocolReport).
const SUBSCRIBER_ID = 'KK2274940';
const REPORT_DATE = '2020-12-28';

// Each row is [protocol, presentage]. The sheet spells the field "presentage"
// and the response keeps that spelling.
const TOTAL = [
  ['Google Generic Call', 28.861467],
  ['SSL', 14.732795],
  ['Facebook Video', 10.539355],
  ['Google_Hangout AudioVideo', 8.489931],
  ['Google', 8.241202],
  ['YouTube', 7.8375087],
  ['Google Play', 7.0990033],
  ['WhatsApp Media', 3.4356785],
  ['YouTube Go', 2.0147762],
  ['YouTube Web', 0.947146],
  ['Others', 7.80114],
];

const DOWNLOAD = [
  ['Google Generic Call', 31.393753],
  ['Facebook Video', 11.951621],
  ['SSL', 10.276348],
  ['YouTube', 8.747378],
  ['Google_Hangout AudioVideo', 8.523185],
  ['Google Play', 8.0052185],
  ['Google', 7.7431736],
  ['WhatsApp Media', 3.8795834],
  ['YouTube Go', 2.27028],
  ['YouTube Web', 0.95113176],
  ['Others', 6.2583227],
];

const UPLOAD = [
  ['SSL', 45.69859],
  ['Google', 11.701767],
  ['Google Generic Call', 11.265757],
  ['Google_Hangout AudioVideo', 8.258861],
  ['Skype Generic Call', 4.769577],
  ['HTTPv2', 1.9816685],
  ['Microsoft', 1.7750473],
  ['YouTube', 1.5152385],
  ['Microsoft Teams', 1.4157481],
  ['Facebook', 1.168442],
  ['Others', 10.4493065],
];

const toEntries = (rows) =>
  rows.map(([protocol, presentage]) => ({ protocol, presentage, usage: null }));

const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    subscriberid: SUBSCRIBER_ID,
    date: REPORT_DATE,
    total: toEntries(TOTAL),
    download: toEntries(DOWNLOAD),
    upload: toEntries(UPLOAD),
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'Protocol' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'Protocol',
      description: 'Per-protocol usage percentages for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'Protocol', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(REPORT_DATE),
    usageType: 'Protocol',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'date', value: REPORT_DATE },
    ],
    mysltResponse,
  });

  console.log(`[SEED] Protocol spec: ${spec.id}`);
  console.log(`[SEED] Protocol usage for ${SUBSCRIBER_ID} (date ${REPORT_DATE}): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});