module.exports = (sequelize, DataTypes) => {
  const folders = sequelize.define('folders', {
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
  return folders;
};
