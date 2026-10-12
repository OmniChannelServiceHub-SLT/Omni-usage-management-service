const mongoose = require('mongoose');
const { Schema } = mongoose;

// TMF635 v4.0.0 - Usage + UsageSpecification
// Each MySLT API is represented by one UsageSpecification 
// Each subscriber's data is a Usage record that references that specification
// and carries the stored MySLT response in `mysltResponse`.

const UsageSpecificationRefSchema = new Schema({
  id: { type: String, required: true },
  href: { type: String },
  name: { type: String },
}, { _id: false });

const RelatedPartySchema = new Schema({
  '@referredType': { type: String, required: true },
  id: { type: String, required: true },
  role: { type: String },
}, { _id: false });

const CharacteristicSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

const UsageSchema = new Schema({
  '@type': { type: String, default: 'Usage' },
  usageDate: { type: Date, required: true },
  usageType: { type: String, required: true },
  status: { type: String, default: 'recorded' },
  usageSpecification: { type: UsageSpecificationRefSchema, required: true },
  relatedParty: [RelatedPartySchema],
  usageCharacteristic: [CharacteristicSchema],

  // Stored MySLT response, returned unchanged by the API
  mysltResponse: { type: Schema.Types.Mixed },
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

const UsageSpecificationSchema = new Schema({
  '@type': { type: String, default: 'UsageSpecification' },
  name: { type: String, required: true },
  description: { type: String },
  usageSpecCharacteristic: [CharacteristicSchema],
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

module.exports = { Usage, UsageSpecification };