require("dotenv").config();
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