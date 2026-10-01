const mongoose = require('mongoose');
const { Schema } = mongoose;

// TMF635 v4.0.0 — Usage resource
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

// TMF635 v4.0.0 — UsageSpecification resource (sibling resource, same spec)
const UsageSpecCharacteristicSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

const UsageSpecificationSchema = new Schema({
  '@type': { type: String, default: 'UsageSpecification' },
  name: { type: String, required: true }, // mandatory per conformance profile
  usageSpecCharacteristic: [UsageSpecCharacteristicSchema],

  // Raw legacy/Excel-shaped response data, kept 1:1 alongside TMF fields.
  legacyData: { type: Schema.Types.Mixed },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

UsageSpecificationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UsageSpecificationSchema.virtual('href').get(function () {
  return `/tmf-api/usageManagement/v4/usageSpecification/${this._id.toHexString()}`;
});

const Usage = mongoose.model('Usage', UsageSchema);
const UsageSpecification = mongoose.model('UsageSpecification', UsageSpecificationSchema);

// Default export stays `Usage` — every existing require('.../TMF635_UsageManagement')
// keeps working unchanged. New code can also pull UsageSpecification off the same export.
module.exports = Usage;
module.exports.UsageSpecification = UsageSpecification;