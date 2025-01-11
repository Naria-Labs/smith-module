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
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      when: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
      },
    });
  },
};
