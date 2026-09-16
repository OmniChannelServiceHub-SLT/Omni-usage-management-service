
require('dotenv').config();


const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3008;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[SERVER] Usage Management Service running on port ${PORT}`);
  });
}

start();