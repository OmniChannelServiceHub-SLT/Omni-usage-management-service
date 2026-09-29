// NOTE: No documented sample response for GetExtraGBPackagesMobile in the API Params
// sheet — confirm exact dataBundle shape with team lead. Built as the mobile-channel

function toLegacyResponse(records) {
  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: records.map((r) => r.legacyData).filter(Boolean),
    errorShow: null,
    errorCode: null,
  };
}

// TMF635 v4.0.0 UsageSpecification list shape.
function toTmfResponse(records) {
  return records.map((doc) => {
    const json = doc.toJSON();
    return {
      id: json.id,
      href: json.href,
      '@type': json['@type'],
      name: json.name,
      usageSpecCharacteristic: json.usageSpecCharacteristic,
    };
  });
}

module.exports = { toLegacyResponse, toTmfResponse };