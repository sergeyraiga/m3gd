const fs = require('fs');
const auth = require('basic-auth');
const path = require('path');
const env = process.env.NODE_ENV || 'local';
const serviceConfig = require('../config/service.json')[env];
const manifest = fs.readFileSync(
  path.join(__dirname, '../static/manifest.json'), 'utf8'
);
const karma_map = fs.readFileSync(
    path.join(__dirname, '../static/karma.json'), 'utf8'
);
const karma_presets = fs.readFileSync(
    path.join(__dirname, '../static/karma_map.json'), 'utf8'
);

module.exports = {
  get: (req, res) => {
    const user = auth(req);
    const username = user ? user.name : '';
    const assets_url = serviceConfig.assets_url;
    const server_url = serviceConfig.server_url;
    const obj = { username, assets_url, manifest, server_url, karma_map, karma_presets };
    res.send(JSON.stringify(obj));
  }
};
