const express = require('express');
const cors = require('cors');

const requestLogger = require('./src/middleware/requestLogger');
const errorHandler = require('./src/middleware/errorHandler');
const bbUsageRequestRoutes = require('./src/APIs/createBBUsageRequest/routes/bbUsageRequestRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/productUsageManagement/v5/productUsage', bbUsageRequestRoutes);

app.use(errorHandler);

module.exports = app;