const { DataTypes, Model } = require("sequelize");

class Debate extends Model {}

function initDebateModel(sequelize) {
  Debate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      motion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Open", "In Progress", "Completed", "Upcoming"),
        allowNull: false,
        defaultValue: "Upcoming",
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rounds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 300,
      },
      maxTeamSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      judges: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "Debate",
      tableName: "debates",
    }
  );
}

module.exports = {
  Debate,
  initDebateModel,
};
