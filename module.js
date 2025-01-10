const { DataTypes } = require("sequelize");
const { initModels } = require("./models/initModels.js");

module.exports = {
  commands: [require("./test/bingus.js"), require("./utility/timereminder.js")],
};

module.exports.initDB = (db) => {
  initModels(db);
  for (const command of module.exports.commands) {
    if ("initFromDB" in command) {
      command.initFromDB(db);
    }
  }
};

module.exports.closeDB = () => {
  for (const command of module.exports.commands) {
    if ("closeDB" in command) {
      command.closeDB();
    }
  }
};
