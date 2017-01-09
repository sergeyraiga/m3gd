const db = require('../models');
const auth = require('basic-auth');
const converter = require('../converter');

function getWorlds(req, res) {
  const query = '\
    SELECT worlds.author, worlds.name, worlds."createdAt", \
      worlds."updatedAt", worlds.id, worlds.world \
    FROM worlds \
    ORDER BY worlds."createdAt" DESC';
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(worlds => res.send(JSON.stringify(worlds)));
}

function getWorldById(req, res, worldId) {
  const query = `\
    SELECT *
    FROM worlds
    WHERE worlds.id = ${worldId}`;
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(
      world => res.send(
        world[0] ?
          JSON.stringify(
            converter.save(world[0].name, JSON.parse(world[0].world))
          )
        : '{}')
      );
}

function getWorld(req, res) {
  console.log(req.query);
  if (req.query.world_id) {
    getWorldById(req, res, req.query.world_id);
  }
  else {
    res.sendStatus(400);
  }
}

function putWorld(req, res) {
  const user = auth(req);
  const username = user ? user.name : 'test';
  const name = req.body.name;
  const world = req.body.world;
  const description = req.body.description;
  db.worlds.build({ author: username, name, description, world }).save()
    .then(() => getWorlds(req, res));
}

function deleteWorld(req, res) {
  const id = req.body.id;
  db.worlds.destroy({ where: { id } }).then(() => getWorlds(req, res));
}

function postWorld(req, res) {
  const data = req.body;
  if (!data) {
    console.log('hey!');
  }
  else {
    db.worlds.upsert(data).then(() => getWorlds(req, res));
  }
}

module.exports = {
  get: getWorlds,
  put: putWorld,
  delete: deleteWorld,
  post: postWorld,
  world: { get: getWorld }
};
