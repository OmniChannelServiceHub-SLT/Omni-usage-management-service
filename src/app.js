const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const getUsageSummaryRoutes = require('./APIs/getUsageSummary/routes/getUsageSummaryRoutes');
const getExtraGbRoutes = require('./APIs/getExtraGb/routes/getExtraGbRoutes');
const getBonusDataRoutes = require('./APIs/getBonusData/routes/getBonusDataRoutes');
const getFreeDataRoutes = require('./APIs/getFreeData/routes/getFreeDataRoutes');
const getCurrMonthDailyRoutes = require('./APIs/getCurrMonthDaily/routes/getCurrMonthDailyRoutes');
const getPrevMonthDailyRoutes = require('./APIs/getPrevMonthDaily/routes/getPrevMonthDailyRoutes');
const listOfferingExtraGbRoutes = require('./APIs/listOfferingExtraGb/routes/listOfferingExtraGbRoutes');
const getWeeksUsageRoutes = require('./APIs/getWeeksUsage/routes/getWeeksUsageRoutes');
const listUsageReportRoutes = require('./APIs/listUsageReport/routes/listUsageReportRoutes');
const listOfferingExtraGbGbRoutes = require('./APIs/listOfferingExtraGbGb/routes/listOfferingExtraGbGbRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/usageManagement/v4/getUsageSummary', getUsageSummaryRoutes);
app.use('/tmf-api/usageManagement/v4/getExtraGb', getExtraGbRoutes);
app.use('/tmf-api/usageManagement/v4/getBonusData', getBonusDataRoutes);
app.use('/tmf-api/usageManagement/v4/getFreeData', getFreeDataRoutes);
app.use('/tmf-api/usageManagement/v4/getCurrMonthDaily', getCurrMonthDailyRoutes);
app.use('/tmf-api/usageManagement/v4/getPrevMonthDaily', getPrevMonthDailyRoutes);
app.use('/tmf-api/usageManagement/v4/listOfferingExtraGb', listOfferingExtraGbRoutes);
app.use('/tmf-api/usageManagement/v4/getWeeksUsage', getWeeksUsageRoutes);
app.use('/tmf-api/usageManagement/v4/listUsageReport', listUsageReportRoutes);
app.use('/tmf-api/usageManagement/v4/listOfferingExtraGbGb', listOfferingExtraGbGbRoutes);

app.use(errorHandler);

module.exports = app;