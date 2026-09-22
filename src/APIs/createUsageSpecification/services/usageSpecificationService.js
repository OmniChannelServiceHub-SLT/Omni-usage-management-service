const { UsageSpecification } = require('../../../models/TMF635_UsageManagement');

async function createUsageSpecification(payload) {
  const { name, usageSpecCharacteristic = [], legacyData } = payload;

  const doc = await UsageSpecification.create({
    name,
    usageSpecCharacteristic,
    legacyData,
  });

  return doc;
}

async function listUsageSpecifications() {
  return UsageSpecification.find().sort({ createdAt: -1 });
}

async function getUsageSpecificationById(id) {
  return UsageSpecification.findById(id);
}

module.exports = { createUsageSpecification, listUsageSpecifications, getUsageSpecificationById };