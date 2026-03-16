const { DataTypes, Model } = require("sequelize");

class User extends Model {}

function initUserModel(sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );

  User.addHook("afterCreate", async (user) => {
    if (!user.studentId) {
      const generatedStudentId = `BTH-${String(user.id).padStart(4, "0")}`;
      await user.update({ studentId: generatedStudentId }, { hooks: false });
    }
  });

  return User;
}

module.exports = {
  User,
  initUserModel,
};
