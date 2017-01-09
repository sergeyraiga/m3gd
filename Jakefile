var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

const env = process.env.NODE_ENV || 'local';

var config = require(path.join(__dirname, '/config/config.json'))[env];

jake.addListener('complete', () => {
    process.exit();
});

desc('Сборка шаблонов');
task('frontend', [], () => {
  console.log("Сборка шаблонов...");
  exec('cd frontend && NODE_ENV=development ../node_modules/.bin/webpack', (error, stdout, stderr) => {
    if (error) {
      console.log('Ошибка Сборки!')
      console.log(stderr)
      fail()
      return
    }
    console.log('Сборка завершена')
    complete()
  })
}, true);


desc('Установка зависимостей');
task('depends', [], () => {
  console.log("Установка зависимостей...")
  exec('npm install --production', (error, stdout, stderr) => {
    if (error) {
      console.log('Ошибка установки зависимостей!')
      console.log(stderr)
      fail()
      return
    }
    console.log('Установка завершена')
    complete()
  })
}, true);

desc('Установка зависимостей (разработка)');
task('depends.dev', [], () => {
  console.log("Установка зависимостей (разработка)...")
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.log('Ошибка установки зависимостей!')
      console.log(stderr)
      fail()
      return
    }
    console.log('Установка завершена')
    complete()
  })
}, true);

desc('Создание локального конфига')
task('configs', [], () => {
  console.log("Создание локального конфига")
  const location = path.join(__dirname, '/config/config.local.json');
  const conf = JSON.stringify(config, null, 2)
  fs.access(location, fs.F_OK, function(err) {
    if (!err) {
      console.log('Конфиг уже существует');
      config = require(path.join(__dirname, '/config/config.local.json'));
      complete();
    } else {
      fs.writeFile(location, conf, err => {
        if (err) {
          console.log(err)
        }
        console.log('Конфиг успешно создан');
        config = require(path.join(__dirname, '/config/config.local.json'));
        complete();
      })
    }
  });
}, true);


desc('Создание базы');
task('db.create', ['configs'], () => {
  console.log('Создание баз...');
  const conf = {}
  conf.user = config.username;
  conf.password = config.password;
  conf.port = config.port || '5432';
  conf.host = config.host || '127.0.0.1';
  const database = config.database || 'm3gd';
  var pgtools = require('pgtools');
  pgtools.createdb(conf, config.database, function (err, res) {
    if (err) {
      if (err.name === 'duplicate_database') {
        console.log('База уже существует');
        complete()
      }
      else {
        console.error(err);
        fail();
      }
    }
    else {
      console.log('База создана');
      complete()
    }
  });
}, true);

desc('Применение миграций');
task('migrate', ['configs'], () => {
  console.log("Применение миграций...")
  exec(`NODE_ENV=${env} npm run migrate`, (error, stdout, stderr) => {
    if (error) {
      console.log('Ошибка применения миграций!')
      console.log(stderr)
      fail()
      return
    }
    console.log('Миграции успешно применены')
    complete()
  })
}, true);

desc('Установка зависимостей (разработка)');
task('depends.dev', [], () => {
  console.log("Установка зависимостей (разработка)...")
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.log('Ошибка установки зависимостей!')
      console.log(stderr)
      fail()
      return
    }
    console.log('Установка завершена')
    complete()
  })
}, true);


desc("Запуск сервиса (разработка)");
task('run.dev', ['depends.dev'], () => {
  console.log('Запуск сервиса (разработка)...');
  const service = require('child_process').spawn('node', ['server.dev.js']);
  service.stdout.on('data', data => { process.stdout.write(`${data}`) });
  service.stderr.on('data', data => { process.stdout.write(`${data}`) });
  service.on('close', code => { process.stdout.write(`Ошибка ${code}`) });
}, true);

desc("Запуск сервиса");
task('run', ['depends', 'db.create', 'migrate'], () => {
  console.log('Запуск сервиса...');
  const service = require('child_process').spawn('npm', ['start']);
  service.stdout.on('data', data => { process.stdout.write(`${data}`) });
  service.stderr.on('data', data => { process.stdout.write(`${data}`) });
  service.on('close', code => { process.stdout.write(`Ошибка ${code}`) });
}, true);

desc("Установка и запуск сервиса локально")
task('local', ['run'], () => {
  console.log('Установка и запуск сервиса локально');
}, true);

desc("Установка и запуск сервиса локально (разработка)")
task('local.dev', ['run.dev'], () => {
  console.log('Установка и запуск сервиса локально (разработка)');
}, true);

desc("Запуск сервиса");
task('server', () => {
  console.log('Запуск сервиса...');
  const service = require('child_process').spawn('npm', ['start']);
  service.stdout.on('data', data => { process.stdout.write(`${data}`) });
  service.stderr.on('data', data => { process.stdout.write(`${data}`) });
  service.on('close', code => { process.stdout.write(`Ошибка ${code}`) });
}, true);
