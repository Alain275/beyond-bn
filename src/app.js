const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const { createSwaggerSpec } = require("./config/swagger");

function createApp() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(port)));

  app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` });
  });

  return app;
}

module.exports = {
  createApp,
};