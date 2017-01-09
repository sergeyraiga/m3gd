const db = require('../models');

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn(db.bot_reports.tableName, 'bot_replay', DataTypes.TEXT);
    },
    down: () => {}
};

