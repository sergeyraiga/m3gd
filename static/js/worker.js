onmessage = function(e) {
  var data = JSON.parse(e.data).args;
  var result = {};
  console.log('Уровень: ' + data.id);
  if (data.url) {
    try {
      var url = data.url.origin;
      importScripts(url + '/static/js/bot.js');
      var params = data.params;
      var bot = new self.com.sq.m3lib.bot.BotEngine();
      result = bot.runBot(
        params.level, params.range, params.iterations, params.seed, params.rangeSeed, params.karmaPresets, params.karmaMap, params.karmaPresetId, params.strategy,
        (a, b, c) => postMessage({ 'type': 'progress', data: [a, b, c] })
      );
      console.log(result);
    }
    catch (err) {
      console.log(err.stack);
    }
  }
  postMessage({ type: 'end', data: result });
};
