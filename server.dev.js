const Express = require('express');
const app = new Express();
const path = require('path');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const levels = require('./routes/levels');
const worlds = require('./routes/worlds');
const routes = require('./routes');

const config = require('./frontend/webpack.config');
const webpack = require('webpack');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const env = process.env.NODE_ENV || 'local';
const serviceConfig = require('./config/service.json')[env];

app.use(webpackDevMiddleware(
  compiler, { noInfo: true, publicPath: config.output.publicPath })
);
app.use(webpackHotMiddleware(compiler));

log4js.configure({ appenders: [{ type: 'console' }] });
const logger = log4js.getLogger('m3gd');
logger.setLevel('INFO');
app.use(
  log4js.connectLogger(
    logger, { level: 'auto', format: ':method :url :status' })
);

const port = process.env.NODE_PORT || serviceConfig.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/', Express.static('static'));
app.use('/static', Express.static('static'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/health', (req, res) => res.send('ok'));

routes.bindRoutes(app);

app.get('/api/level', levels.level.get);
app.get('/api/world', worlds.world.get);
app.post('/move_level', levels.level.move);

app.listen(port, '127.0.0.1', error =>
  error ? logger.error(error) : logger.info('Сервис запущен. Порт: %s', port)
);
