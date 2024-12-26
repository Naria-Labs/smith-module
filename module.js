const { DataTypes } = require("sequelize");
const { ModelDef } = require.main.require("./database.js");

module.exports = {
  commands: [require("./utils/bingus.js"), require("./utils/timereminder.js")],
  models: [
    new ModelDef("NotificationHour", {
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
    }),
  ],
};
