require("dotenv").config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Usage Management Service running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start service:", err.message);
    process.exit(1);
  });