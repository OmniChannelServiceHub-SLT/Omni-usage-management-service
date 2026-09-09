// Legacy shape: single latest snapshot, matching the SLT/Excel UsageSummary response.
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