module.exports = (sequelize, DataTypes) => {
  const level_folders = sequelize.define('level_folders', {
    folderId: DataTypes.INTEGER,
    levelId: DataTypes.INTEGER
  });
  return level_folders;
};
