const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const { createSwaggerSpec } = require("./config/swagger");

function createApp() {
  const app = express();
  const port = process.env.PORT || 4000;

  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const defaultOrigins = [
    "http://localhost:5173",
    "https://beyond-bn.onrender.com/",
    "https://beyondthehorizon-npc.netlify.app/",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
  ];

  const originAllowlist = new Set([...defaultOrigins, ...allowedOrigins]);

  const corsOptions = {
    origin(origin, callback) {
      // Allow non-browser requests and same-origin requests with no Origin header.
      if (!origin) {
        return callback(null, true);
      }

      if (originAllowlist.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
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