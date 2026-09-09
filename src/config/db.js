const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env");
  }

  try {
    await mongoose.connect(uri);
    console.log(`[DB] Connected to MongoDB: ${uri}`);
  } catch (err) {
    console.error("[DB] Connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;