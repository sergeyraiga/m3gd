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
  const query = '\
    INSERT INTO \
     levels (level.author, level.name, level."createdAt", level."updatedAt", level.level) \
        SELECT level.author, level.name, level."createdAt", level."updatedAt", level.level \ 
        FROM level, level_folders WHERE level_folders."folderId" = ${req.body.id};';
  db.sequelize.query(query).spread(function(results, metadata) {
    results.forEach(function(item) {
        const levId = item.id;
        const foldId = new_folder_id;
        db.level_folders.build({ levId, foldId }).save();
    });
  });
}

function copyFolder(req, res) {
  var fid;
  const id = req.body.id;
  db.folders.build({ author: username, req.body.name, req.body.desc }).save().then(function(fld){ fid = fld.id }).then(() => getFolders(req, res));
  if (req.body.levels_count > 0)
  {
      copyFolderLevels(req, res, fid);
  }
  
}

function putFolder(req, res) {
  const user = auth(req);
  const username = user ? user.name : 'test';
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
  delete: deleteFolder
};
