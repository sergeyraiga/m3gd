const db = require('../models');
const auth = require('basic-auth');

function getFolderLevels(req, res, folder_id) {
  const query = `\
    SELECT levels.author, levels.name, levels."createdAt", \
      levels."updatedAt", levels.id, levels.level, \
      ARRAY( \
        SELECT folders.name FROM level_folders, folders \
        WHERE level_folders."levelId" = levels.id \
          AND level_folders."folderId" = folders.id) AS "folders" \
    FROM levels, folders, level_folders \
    WHERE level_folders."folderId" = ${folder_id} AND level_folders."levelId" = levels.id \
    GROUP BY levels.id;`;
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(levels => res.send(JSON.stringify({ 'configs': levels })));
}

function getLevels(req, res) {
  const query = '\
    SELECT levels.author, levels.name, levels."createdAt", \
      levels."updatedAt", levels.id, levels.level, \
      ARRAY( \
        SELECT folders.name FROM level_folders, folders \
        WHERE level_folders."levelId" = levels.id \
        AND level_folders."folderId" = folders.id) AS "folders" \
    FROM levels \
    WHERE levels.id NOT IN (select level_folders."levelId" from level_folders) \
    ORDER BY levels."createdAt" DESC;';
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(levels => {
      const obj = { 'configs': levels };
      res.send(JSON.stringify(obj));
    });
}

function getLevelById(req, res, level_id) {
  const query = `\
    SELECT levels.author, levels.name, levels."createdAt", \
      levels."updatedAt", levels.id, levels.level
    FROM levels
    WHERE levels.id = ${level_id}`;
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(level => {
      if (!level[0]) {
        res.send('{}');
      }
      else {
        res.send(JSON.stringify(JSON.parse(level[0].level)));
      }
    });
}

function moveLevel(req, res) {
  const data = req.body;
  db.level_folders.upsert({ folderId: data.folder_id, levelId: data.level_id })
    .then(() => getLevels(req, res));
}

function putLevel(req, res) {
  const user = auth(req);
  const username = user ? user.name : 'test';
  const name = req.body.name;
  const level = req.body.level;
  const description = req.body.description;
  db.levels.build({ author: username, name, description, level }).save()
    .then(() => getLevels(req, res));
}

function deleteLevel(req, res) {
  const id = req.body.id;
  db.levels.destroy({ where: { id } })
    .then(() =>
      db.levels.findAll({ order: '"createdAt" DESC' })
        .then(() => getLevels(req, res))
    );
}

function postLevel(req, res) {
  const data = req.body;
  if (data.folder_id && !data.id) {
    getFolderLevels(req, res, data.folder_id);
  }
  else if (data.folder_id && data.id) {
    db.levels.upsert(data).then(() => getFolderLevels(req, res, data.folder_id));
  }
  else { db.levels.upsert(data).then(() => getLevels(req, res)); }
}

const getLevel = (req, res) =>
  req.query.level_id ?
    getLevelById(req, res, req.query.level_id) : res.sendStatus(400);

module.exports = {
  get: getLevels,
  put: putLevel,
  delete: deleteLevel,
  post: postLevel,
  level: { get: getLevel, move: moveLevel }
};
