// NOTE: No documented legacy sample response found for GetReportTimePeriod
// (referenced sheet missing from API Params workbook) 

function toLegacyResponse(records) {
  if (!records || records.length === 0) {
    return {
      isSuccess: false,
      errorMessege: 'No usage records found for this subscriber',
      exceptionDetail: null,
      dataBundle: null,
      errorShow: null,
      errorCode: 'NOT_FOUND',
    };
  }

  const periods = [...new Set(records.map((r) => {
    const d = r.usageDate;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }))];

  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: { availablePeriods: periods },
    errorShow: null,
    errorCode: null,
  };
}

// TMF635 v4.0.0 Usage list shape (raw records backing the derived periods).
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
      status: json.status,
    };
  });
}

module.exports = { toLegacyResponse, toTmfResponse };