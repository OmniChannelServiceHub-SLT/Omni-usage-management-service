require('dotenv').config();
const mongoose = require('mongoose');
const { Usage, UsageSpecification } = require('../models/TMF635_UsageManagement');

const SUBSCRIBER_ID = '94382222802';
const BILL_DATE = '01';
const MONTH_INDEX = '1';

// Sample output taken from the XLSX (A44 PreviousMonthsDailyUsage):
// 30 daily entries, 2020-09-01 to 2020-09-30, all values zero.
function buildDailyList() {
  const list = [];
  for (let day = 1; day <= 30; day++) {
    const dd = String(day).padStart(2, '0');
    list.push({
      date: `2020-09-${dd}`,
      displaydate: `Sep-${dd}`,
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
    previousmonths: null,
    dailylist: buildDailyList(),
  },
  errorShow: null,
  errorCode: null,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  let spec = await UsageSpecification.findOne({ name: 'PrevMonthDaily' });
  if (!spec) {
    spec = await UsageSpecification.create({
      name: 'PrevMonthDaily',
      description: 'Previous months daily usage for a broadband subscriber',
    });
  }

  await Usage.deleteMany({ usageType: 'PrevMonthDaily', 'relatedParty.id': SUBSCRIBER_ID });

  const usage = await Usage.create({
    usageDate: new Date(),
    usageType: 'PrevMonthDaily',
    status: 'recorded',
    usageSpecification: { id: spec.id, name: spec.name },
    relatedParty: [{ '@referredType': 'Subscriber', id: SUBSCRIBER_ID }],
    usageCharacteristic: [
      { name: 'billDate', value: BILL_DATE },
      { name: 'monthIndex', value: MONTH_INDEX },
      { name: 'volume_unit', value: 'GB' },
    ],
    mysltResponse,
  });

  console.log(`[SEED] PrevMonthDaily spec: ${spec.id}`);
  console.log(`[SEED] PrevMonthDaily usage for ${SUBSCRIBER_ID} (billDate ${BILL_DATE}, monthIndex ${MONTH_INDEX}): ${usage.id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED] Failed:', err.message);
  process.exit(1);
});