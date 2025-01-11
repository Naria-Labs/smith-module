const { DataTypes } = require("sequelize");

module.exports = {
  initModels: (db) => {
    db.define("smith_ConstantNotificationHour", {
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      hour: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      minute: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
    });

    db.define("smith_RemindMe", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      when: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
      },
    });
  },
};
