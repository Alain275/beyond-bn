const { DataTypes, Model } = require("sequelize");

class PDF extends Model {}

function initPDFModel(sequelize) {
  PDF.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("published", "draft"),
        allowNull: false,
        defaultValue: "draft",
      },
    },
    {
      sequelize,
      modelName: "PDF",
      tableName: "pdfs",
    }
  );
}

module.exports = {
  PDF,
  initPDFModel,
};