// Legacy shape matches the exact SLT/Excel response documented in the API Params sheet.
function toLegacyResponse(doc) {
  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: doc.legacyData || null,
    errorShow: null,
    errorCode: null,
  };
}

// TMF635 v4.0.0 Usage resource shape.
function toTmfResponse(doc) {
  const json = doc.toJSON();
  return {
    id: json.id,
    href: json.href,
    '@type': json['@type'],
    usageDate: json.usageDate,
    usageType: json.usageType,
    usageSpecification: json.usageSpecification,
    relatedParty: json.relatedParty,
    usageCharacteristic: json.usageCharacteristic,
    status: json.status,
  };
}

module.exports = { toLegacyResponse, toTmfResponse };