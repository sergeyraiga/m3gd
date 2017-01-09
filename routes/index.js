const init = require('./init');
const levels = require('./levels');
const worlds = require('./worlds');
const folders = require('./folders');
const bot_reports = require('./bot_reports');
const bot_reports_csv = require('./bot_reports_csv');
const bot_replay_json = require('./bot_replay_json');
const karma = require('./karma');

var routes = {
  init: init,
  levels: levels,
  worlds: worlds,
  folders: folders,
  bot_reports: bot_reports,
  bot_reports_csv: bot_reports_csv,
  bot_replay_json: bot_replay_json,
  karma: karma
};

const methods = ['get', 'put', 'delete', 'post'];
const entities = [
  'init', 'folders', 'worlds',
  'levels', 'bot_reports', 'bot_reports_csv', 'bot_replay_json', 'karma'];

function bindRoutes(app) {
  methods.map(method =>
    entities.map(entity => routes[entity][method] ?
      app[method]('/' + entity, routes[entity][method]) : null
    )
  );
}

module.exports = { bindRoutes: bindRoutes };
