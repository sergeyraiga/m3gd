const db = require('../models');
const auth = require('basic-auth');

function getFolders(req, res) {
  const query = '\
    SELECT \
      folders.author, folders.name, folders."desc", folders."createdAt", \
      folders."updatedAt",folders.id, \
      (SELECT COUNT("levelId") \
        FROM level_folders \
        WHERE folders.id = level_folders."folderId") AS "levels_count" \
    FROM folders \
    GROUP BY folders.id;';
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(folders => res.send(JSON.stringify(folders)));
}

function copyFolderLevels(req, res, new_folder_id) {
          const query = 'INSERT INTO levels (levels.author, levels.name, levels."createdAt", levels."updatedAt", levels.level) SELECT levels.author, levels.name, levels."createdAt", levels."updatedAt", levels.level FROM levels, level_folders WHERE level_folders."folderId" = ${req.body.id};';
          db.sequelize.query(query).spread(function(results, metadata) {
              results.forEach(function(item) {
              const levId = item.id;
              const foldId = new_folder_id;
              db.level_folders.build({ levId, foldId }).save();
              });
          });
}

function copyFolder(req, res) {
  const user = auth(req);
  const username = user ? user.name : 'test';
  const name = req.body.name;
  const desc = req.body.description;
  const q = req.body.levels_count;
  db.folders.build({ author: username, name, desc }).save()
  .then(fld => copyFolderLevels(req, res, fld.id))
  .then(() => getFolders(req, res));
}

function putFolder(req, res) {
  const user = req.body.author;
  const name = req.body.name;
  const desc = req.body.description;
  db.folders.build({ author: username, name, desc }).save()
    .then(() => getFolders(req, res));
}

function deleteFolder(req, res) {
  const id = req.body.id;
  db.folders.destroy({ where: { id } }).then(() => getFolders(req, res));
}

function postFolder(req, res) {
  const data = req.body;
  if (!data) { console.log('hey!'); }
  else { db.folders.upsert(data).then(() => getFolders(req, res)); }
}

module.exports = {
  get: getFolders,
  put: putFolder,
  post: postFolder,
  copy: copyFolder,
  folderlevels: copyFolderLevels,
  delete: deleteFolder
};
