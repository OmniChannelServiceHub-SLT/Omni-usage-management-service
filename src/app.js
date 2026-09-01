const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const bbUsageRequestRoutes = require('./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes');
const usageSummaryRoutes = require('./APIs/usageSummary/routes/usageSummaryRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/productUsageManagement/v5/productUsage', bbUsageRequestRoutes);
app.use('/tmf-api/productUsageManagement/v5/usageSummary', usageSummaryRoutes);

app.use(errorHandler);

module.exports = app;