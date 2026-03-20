const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = Number(process.env.DB_PORT || 5432);
const dbName = process.env.DB_NAME || "beyond";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbSsl = String(process.env.DB_SSL || "false").toLowerCase() === "true";
const dialectOptions = dbSsl
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : undefined;

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      dialectOptions,
      logging: false,
    })
  : new Sequelize({
      dialect: "postgres",
      host: dbHost,
      port: dbPort,
      database: dbName,
      username: dbUser,
      password: dbPassword,
      dialectOptions,
      logging: false,
    });

module.exports = {
  sequelize,
};
