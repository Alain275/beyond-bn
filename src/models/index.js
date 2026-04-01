const bcrypt = require("bcryptjs");

const { sequelize } = require("../config/database");
const { User, initUserModel } = require("./User");
const { Article, initArticleModel } = require("./Article");
const { Activity, initActivityModel } = require("./Activity");

initUserModel(sequelize);
initArticleModel(sequelize);
initActivityModel(sequelize);

async function ensureSeedUser({ firstName, lastName, phone, email, password, role }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return existing;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return User.create({
    firstName,
    lastName,
    phone,
    email,
    role,
    passwordHash,
  });
}

async function initDatabase() {
  await sequelize.authenticate();
  await sequelize.sync();

  await ensureSeedUser({
    firstName: "System",
    lastName: "Admin",
    phone: "+0000000000",
    email: "admin@beyond.com",
    password: "Admin@123",
    role: "admin",
  });

  await ensureSeedUser({
    firstName: "Regular",
    lastName: "User",
    phone: "+1111111111",
    email: "user@beyond.com",
    password: "User@123",
    role: "user",
  });
}

module.exports = {
  sequelize,
  User,
  Article,
  Activity,
  initDatabase,
};
