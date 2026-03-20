require("dotenv").config();

const { createApp } = require("./app");
const { initDatabase } = require("./models");

const port = process.env.PORT || 4000;
const app = createApp();

async function startServer() {
  try {
    await initDatabase();

    app.listen(port, () => {
      console.log(`Beyond backend listening on http://localhost:${port}`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    const code = error?.original?.code || error?.parent?.code || error?.code;

    if (code === "ENOTFOUND") {
      console.error("Database host could not be resolved.");
      console.error(
        "If you use Supabase, prefer the pooler endpoint from Dashboard > Project Settings > Database > Connection string.",
      );
      console.error("Set DB_SSL=true and use the exact host/port/user values provided there.");
    } else if (code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
      console.error("Verify host, port, firewall rules, and that DB_SSL is true for hosted PostgreSQL.");
    }

    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();