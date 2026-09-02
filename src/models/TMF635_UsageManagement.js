const mongoose = require('mongoose');
const { Schema } = mongoose;

// TMF635 v4.0.0 — Usage resource
// Shared model 
const UsageSpecificationRefSchema = new Schema({
  id: { type: String, required: true },
  href: { type: String },
}, { _id: false });

const RelatedPartySchema = new Schema({
  '@referredType': { type: String, required: true }, // e.g. "Subscriber"
  id: { type: String, required: true },
  role: { type: String },
}, { _id: false });

const UsageCharacteristicSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

const UsageSchema = new Schema({
  '@type': { type: String, default: 'Usage' },
  usageDate: { type: Date, required: true },   // mandatory per TMF635B v4.0.0 conformance profile
  usageType: { type: String, required: true }, // mandatory per TMF635B v4.0.0 conformance profile
  usageSpecification: { type: UsageSpecificationRefSchema, required: true }, // usageSpecification.id is mandatory
  relatedParty: [RelatedPartySchema],           // optional array; used here to carry subscriberId
  usageCharacteristic: [UsageCharacteristicSchema],
  status: { type: String, default: 'recorded' },
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