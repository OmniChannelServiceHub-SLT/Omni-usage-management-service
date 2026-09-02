const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const bbUsageRequestRoutes = require('./APIs/createBBUsageRequest/routes/bbUsageRequestRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/tmf-api/usageManagement/v4/usage', bbUsageRequestRoutes);


app.use(errorHandler);

module.exports = app;