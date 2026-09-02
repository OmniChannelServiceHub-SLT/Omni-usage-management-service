const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const bbUsageRequestRoutes = require('./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes');
const usageSummaryRoutes = require('./APIs/createUsageSummary/routes/usageSummaryRoutes');
const extraGBRoutes = require('./APIs/createExtraGB/routes/extraGBRoutes');
const weeksUsageRoutes = require('./APIs/createWeeksUsage/routes/weeksUsageRoutes');
const bonusDataRoutes = require('./APIs/createBonusData/routes/bonusDataRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/usageManagement/v4/usage', bbUsageRequestRoutes);
app.use('/tmf-api/usageManagement/v4/usageSummary', usageSummaryRoutes);
app.use('/tmf-api/usageManagement/v4/extraGB', extraGBRoutes);
app.use('/tmf-api/usageManagement/v4/weeksUsage', weeksUsageRoutes);
app.use('/tmf-api/usageManagement/v4/bonusData', bonusDataRoutes);

app.use(errorHandler);

module.exports = app;