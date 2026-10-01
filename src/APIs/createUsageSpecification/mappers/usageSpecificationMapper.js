// NOTE: UsageSpecification is a TMF-native construct — it has no legacy SLT/Excel
// equivalent (nothing in the old system created "specifications"). Legacy mode here
// just wraps the same data in the standard isSuccess/dataBundle shape for consistency
// with the rest of the service, rather than mimicking a real old response.

function toLegacyResponse(doc) {
  if (!doc) {
    return {
      isSuccess: false,
      errorMessege: 'UsageSpecification not found',
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
    dataBundle: doc.legacyData || { name: doc.name, usageSpecCharacteristic: doc.usageSpecCharacteristic },
    errorShow: null,
    errorCode: null,
  };
}

function toLegacyListResponse(docs) {
  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: docs.map((d) => d.legacyData || { name: d.name, usageSpecCharacteristic: d.usageSpecCharacteristic }),
    errorShow: null,
    errorCode: null,
  };
}

// TMF635 v4.0.0 UsageSpecification resource shape.
function toTmfResponse(doc) {
  const json = doc.toJSON();
  return {
    id: json.id,
    href: json.href,
    '@type': json['@type'],
    name: json.name,
    usageSpecCharacteristic: json.usageSpecCharacteristic,
  };
}

function toTmfListResponse(docs) {
  return docs.map((doc) => toTmfResponse(doc));
}

module.exports = { toLegacyResponse, toLegacyListResponse, toTmfResponse, toTmfListResponse };