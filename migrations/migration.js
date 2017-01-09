const db = require('../models');

module.exports = {
  up: (queryInterface) => {
    console.log(db);
    return queryInterface.createTable(db.worlds.tableName, db.worlds.attributes)
      .then(() =>
        queryInterface.createTable(db.levels.tableName, db.levels.attributes))
      .then(() =>
        queryInterface.createTable(db.folders.tableName, db.folders.attributes))
      .then(() =>
        queryInterface.createTable(db.level_folders.tableName, db.level_folders.attributes))
      .then(() =>
        queryInterface.createTable(db.bot_reports.tableName, db.bot_reports.attributes));
  },
  down: () => {}
};
