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
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();