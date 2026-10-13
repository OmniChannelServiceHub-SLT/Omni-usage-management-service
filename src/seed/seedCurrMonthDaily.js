require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';
const BILL_DATE = '01';

// Sample output taken from the XLSX (A43 CurrentMonthsDailyUsage):
// 7 daily entries, 2020-10-01 to 2020-10-07, all values zero.
function buildDailyList() {
  const list = [];
  for (let day = 1; day <= 7; day++) {
    const dd = String(day).padStart(2, '0');
    list.push({
      date: `2020-10-${dd}`,
      displaydate: `Oct-${dd}`,
      volumeunit: 'GB',
      totalusage: '0.0',
      standardusage: '0.0',
      freeusage: '0.0',
      peakdownload: null,
      offpeakdownload: null,
      peakupload: null,
      offpeakupload: null,
      totalpercentage: 0.0,
      standardpercentage: 0.0,
      peakdownloadpercentage: 0.0,
      offpeakdownloadpercentage: 0.0,
      peakuploadpercentage: 0.0,
      offpeakuploadpercentage: 0.0,
      error_record: false,
    });
  }
  return list;
}

const mysltResponse = {
  isSuccess: true,
  errorMessege: null,
  exceptionDetail: null,
  dataBundle: {
    showFourColumns: false,
    showSingleColumn: false,
    previousmonths: { previous1: 'Sep2020', previous2: 'Aug2020' },
    dailylist: buildDailyList(),
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'CurrMonthDaily' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'CurrMonthDaily',
      description: 'Current month daily usage for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'CurrMonthDaily', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'CurrMonthDaily',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'billDate', value: BILL_DATE },
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] CurrMonthDaily spec: ${spec.id}`);
  console.log(`[SEED] CurrMonthDaily usage for ${SUBSCRIBER_ID} (billDate ${BILL_DATE}): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});