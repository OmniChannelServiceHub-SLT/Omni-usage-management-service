const mongoose = require('mongoose');
const { Schema } = mongoose;

// TMF635 v4.0.0 — Usage resource
// Shared model 
const UsageSpecificationRefSchema = new Schema({
  id: { type: String, required: true },
  href: { type: String },
}, { _id: false });

const RelatedPartySchema = new Schema({
  '@referredType': { type: String, required: true },
  id: { type: String, required: true },
  role: { type: String },
}, { _id: false });

const UsageCharacteristicSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

const UsageSchema = new Schema({
  '@type': { type: String, default: 'Usage' },
  usageDate: { type: Date, required: true },
  usageType: { type: String, required: true },
  usageSpecification: { type: UsageSpecificationRefSchema, required: true },
  relatedParty: [RelatedPartySchema],
  usageCharacteristic: [UsageCharacteristicSchema],
  status: { type: String, default: 'recorded' },

  // Raw legacy/Excel-shaped response data, kept 1:1 alongside TMF fields.
  // Populated on create, returned as-is by the legacy mapper.
  legacyData: { type: Schema.Types.Mixed },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

UsageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UsageSchema.virtual('href').get(function () {
  return `/tmf-api/usageManagement/v4/usage/${this._id.toHexString()}`;
});

module.exports = mongoose.model('Usage', UsageSchema);