const express = require('express');
const cors = require('cors');



const bbUsageRequestRoutes = require("./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes");
const extraGBRoutes = require("./APIs/createExtraGB/routes/extraGBRoutes");
const usageSummaryRoutes = require("./APIs/createUsageSummary/routes/usageSummaryRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/productUsageManagement/v5/productUsage', bbUsageRequestRoutes);


app.use("/tmf-api/usageManagement/v4/usage", bbUsageRequestRoutes);
app.use("/tmf-api/usageManagement/v4/extragb", extraGBRoutes);
app.use("/tmf-api/usageManagement/v4/usagesummary", usageSummaryRoutes);

module.exports = app;