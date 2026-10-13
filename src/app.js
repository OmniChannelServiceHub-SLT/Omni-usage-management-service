const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const getBonusDataRoutes = require('./APIs/getBonusData/routes/getBonusDataRoutes');
const getFreeDataRoutes = require('./APIs/getFreeData/routes/getFreeDataRoutes');
const getCurrMonthDailyRoutes = require('./APIs/getCurrMonthDaily/routes/getCurrMonthDailyRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/usageManagement/v4/getBonusData', getBonusDataRoutes);
app.use('/tmf-api/usageManagement/v4/getFreeData', getFreeDataRoutes);
app.use('/tmf-api/usageManagement/v4/getCurrMonthDaily', getCurrMonthDailyRoutes);

app.use(errorHandler);

module.exports = app;