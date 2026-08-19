const express = require("express");


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "usage-management-service" });
});


module.exports = app;