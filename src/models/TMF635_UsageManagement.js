const mongoose = require("mongoose");

const UsageCharacteristicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    valueType: { type: String, default: "string" },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const RelatedPartySchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // subscriberID
    role: { type: String, default: "Subscriber" },
    referredType: { type: String, default: "Individual" }
  },
  { _id: false }
);

const UsageSchema = new mongoose.Schema(
  {
    type: { type: String, default: "Usage" },
    status: {
      type: String,
      enum: ["guided", "rated", "recognized", "billed", "rejected"],
      default: "recognized"
    },
    statusReason: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    usageSpecification: {
      id: { type: String, default: "BB_DATA_USAGE" },
      name: { type: String, default: "Broadband Data Usage" }
    },
    usageCharacteristic: { type: [UsageCharacteristicSchema], default: [] },
    relatedParty: { type: [RelatedPartySchema], default: [] }
  },
  { timestamps: true }
);

UsageSchema.methods.toTMF = function (baseUrl) {
  const obj = this.toObject({ versionKey: false });
  return {
    id: obj._id.toString(),
    href: `${baseUrl}/${obj._id.toString()}`,
    type: obj.type,
    status: obj.status,
    statusReason: obj.statusReason || null,
    description: obj.description || null,
    date: obj.date,
    usageSpecification: obj.usageSpecification,
    usageCharacteristic: obj.usageCharacteristic,
    relatedParty: obj.relatedParty
  };
};

module.exports = mongoose.model("TMF635_Usage", UsageSchema);