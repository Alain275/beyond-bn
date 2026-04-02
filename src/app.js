const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const activityRoutes = require("./routes/activityRoutes");
const debateRoutes = require("./routes/debateRoutes");
const { getCloudinaryConfigStatus } = require("./config/cloudinary");
const { createSwaggerSpec } = require("./config/swagger");

function createApp() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/health/config", (_req, res) => {
    const cloudinary = getCloudinaryConfigStatus();

    res.status(200).json({
      status: "ok",
      cloudinary,
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/activities", activityRoutes);
  app.use("/api/debates", debateRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(port)));

  app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` });
  });

  return app;
}

module.exports = {
  createApp,
};