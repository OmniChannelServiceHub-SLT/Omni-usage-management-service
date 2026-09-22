const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const bbUsageRequestRoutes = require('./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes');
const usageSummaryRoutes = require('./APIs/createUsageSummary/routes/usageSummaryRoutes');
const extraGBRoutes = require('./APIs/createExtraGB/routes/extraGBRoutes');
const weeksUsageRoutes = require('./APIs/createWeeksUsage/routes/weeksUsageRoutes');
const bonusDataRoutes = require('./APIs/createBonusData/routes/bonusDataRoutes');
const freeDataRoutes = require('./APIs/createFreeData/routes/freeDataRoutes');
const currentMonthsDailyUsageRoutes = require('./APIs/createCurrentMonthsDailyUsage/routes/currentMonthsDailyUsageRoutes');
const enhancedCurrentDailyUsageRoutes = require('./APIs/createEnhancedCurrentDailyUsage/routes/enhancedCurrentDailyUsageRoutes');
const previousMonthDailyUsageRoutes = require('./APIs/createPrevoiusMonthDailyUsage/routes/previousMonthDailyUsageRoutes');
const enhancedPreviousDailyUsageRoutes = require('./APIs/createEnhancedPreviousDailyUsage/routes/enhancedPreviousDailyUsageRoutes');
const usageSpecificationRoutes = require('./APIs/createUsageSpecification/routes/usageSpecificationRoutes');
const extraGBPackagesRoutes = require('./APIs/listExtraGBPackages/routes/extraGBPackagesRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/usageManagement/v4/usage', bbUsageRequestRoutes);
app.use('/tmf-api/usageManagement/v4/usageSummary', usageSummaryRoutes);
app.use('/tmf-api/usageManagement/v4/extraGB', extraGBRoutes);
app.use('/tmf-api/usageManagement/v4/weeksUsage', weeksUsageRoutes);
app.use('/tmf-api/usageManagement/v4/bonusData', bonusDataRoutes);
app.use('/tmf-api/usageManagement/v4/freeData', freeDataRoutes);
app.use('/tmf-api/usageManagement/v4/currentMonthsDailyUsage', currentMonthsDailyUsageRoutes);
app.use('/tmf-api/usageManagement/v4/enhancedCurrentDailyUsage', enhancedCurrentDailyUsageRoutes);
app.use('/tmf-api/usageManagement/v4/previousMonthDailyUsage', previousMonthDailyUsageRoutes);
app.use('/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage', enhancedPreviousDailyUsageRoutes);
app.use('/tmf-api/usageManagement/v4/usageSpecification', usageSpecificationRoutes);
app.use('/tmf-api/usageManagement/v4/extraGBPackages', extraGBPackagesRoutes);

app.use(errorHandler);

module.exports = app;