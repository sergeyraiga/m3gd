const db = require('../models');

module.exports = {
    up: (queryInterface, DataTypes) => {
        console.log(db);
        return queryInterface.addColumn(db.bot_reports.tableName, 'super_items_created_average', DataTypes.INTEGER);
    },
    down: () => {}
};

