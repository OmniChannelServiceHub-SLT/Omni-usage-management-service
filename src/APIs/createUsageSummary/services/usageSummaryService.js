const Usage = require("../../../models/TMF635_UsageManagement");


const getUsageSummary = async (subscriberID) => {
  if (!subscriberID) {
    const err = new Error("subscriberID is required");
    err.statusCode = 400;
    throw err;
  }

  const records = await Usage.find({ "relatedParty.id": subscriberID }).sort({ date: -1 });

  if (!records.length) {
    const err = new Error("No usage records found for this subscriber");
    err.statusCode = 404;
    throw err;
  }

  return {
    subscriberID,
    totalRequests: records.length,
    lastRequestDate: records[0].date,
    records: records.map((r) => ({
      id: r._id.toString(),
      status: r.status,
      date: r.date,
      usageCharacteristic: r.usageCharacteristic
    }))
  };
};

module.exports = { getUsageSummary };