const path = require("path");
const { Sequelize } = require("sequelize");

const storagePath = process.env.DB_STORAGE
  ? path.resolve(process.cwd(), process.env.DB_STORAGE)
  : path.resolve(__dirname, "../../database.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});

module.exports = {
  sequelize,
};
