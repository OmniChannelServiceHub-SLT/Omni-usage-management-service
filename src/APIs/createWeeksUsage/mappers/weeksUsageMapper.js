// Legacy shape follows the standard SLT isSuccess/dataBundle wrapper.
// exact dataBundle fields for WeeksUsage aren't confirmed yet (no sample response
// in the API Params sheet) 
function toLegacyResponse(records) {
  if (!records || records.length === 0) {
    return {
      isSuccess: false,
      errorMessege: 'No usage record found for this subscriber in the last 7 days',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'NOT_FOUND',
    };
  }

  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: records.map((r) => r.legacyData).filter(Boolean),
    errorShow: null,
    errorCode: null,
  };
}

// TMF635 v4.0.0 Usage list shape.
function toTmfResponse(records) {
  return records.map((doc) => {
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
  });
}

module.exports = { toLegacyResponse, toTmfResponse };