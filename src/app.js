const express = require("express");



const bbUsageRequestRoutes = require("./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes");
const extraGBRoutes = require("./APIs/createExtraGB/routes/extraGBRoutes");
const usageSummaryRoutes = require("./APIs/createUsageSummary/routes/usageSummaryRoutes");


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "usage-management-service" });
});


app.use("/tmf-api/usageManagement/v4/usage", bbUsageRequestRoutes);
app.use("/tmf-api/usageManagement/v4/extragb", extraGBRoutes);
app.use("/tmf-api/usageManagement/v4/usagesummary", usageSummaryRoutes);

module.exports = app;