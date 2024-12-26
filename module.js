const { DataTypes } = require("sequelize");
const { ModelDef } = require("database.js");

module.exports = {
  commands: [require("./utils/bingus.js"), require("./utils/timereminder.js")],
  models: [
    ModelDef("NotificationHour", {
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    }),
  ],
};
