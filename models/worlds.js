module.exports = (sequelize, DataTypes) => {
  const worlds = sequelize.define('worlds', {
    author: DataTypes.STRING,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    world: DataTypes.TEXT
  });
  return worlds;
};
