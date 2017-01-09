const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'local';

var config = {};
if (env === 'local') {
  config = require(path.join(__dirname, '/../config/config.local.json'));
}
else {
  config = require(path.join(__dirname, '/../config/config.json'))[env];
}

const db = {};
var sequelize = null;

sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.folders.belongsToMany(db.levels, { as: 'folders', through: db.level_folders, foreignKey: 'folderId' });
db.levels.belongsToMany(db.folders, { as: 'levels', through: db.level_folders, foreignKey: 'levelId' });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
