const Usage = require('../../../models/TMF635_UsageManagement');

async function listReportTimePeriod(subscriberId) {
  const records = await Usage.find({
    'relatedParty.id': subscriberId,
    'relatedParty.@referredType': 'Subscriber',
  }).sort({ usageDate: -1 });

  return records;
}

module.exports = { listReportTimePeriod };