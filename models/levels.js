module.exports = (sequelize, DataTypes) => {
  const levels = sequelize.define('levels', {
    author: DataTypes.STRING,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    level: DataTypes.TEXT
  });
  return levels;
};
