const mongoose = require('mongoose');
const { Schema } = mongoose;

// Loosely follows TMF635 v5.0.0 ProductUsage resource
// Shared model — used by createBBUsageRequest, usageSummary, extraGB
const CharacteristicSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

const ExternalIdentifierSchema = new Schema({
  owner: { type: String, required: true },
  externalIdentifierType: { type: String, required: true },
  id: { type: String, required: true },
}, { _id: false });

const ProductUsageSchema = new Schema({
  '@type': { type: String, default: 'ProductUsage' },
  usageType: { type: String, required: true },
  status: { type: String, default: 'received' },
  usageCharacteristic: [CharacteristicSchema],
  externalIdentifier: [ExternalIdentifierSchema],
  lastUpdate: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

ProductUsageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ProductUsageSchema.virtual('href').get(function () {
  return `/tmf-api/productUsageManagement/v5/productUsage/${this._id.toHexString()}`;
});

module