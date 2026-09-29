// NOTE: No separate documented sample response for UsageSummaryV2 exists in the
// API Params sheet — only the original UsageSummary (A39) is documented. Built here

function toLegacyResponse(records) {
  if (!records || records.length === 0) {
    return {
      isSuccess: false,
      errorMessege: 'No usage record found for this subscriber',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'NOT_FOUND',
    };
  }

  const latest = records[0];

  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: latest.legacyData || null,
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