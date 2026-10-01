// Legacy shape matches the exact SLT/Excel GetExtraGBPackages response —
// an array of package objects inside dataBundle.
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