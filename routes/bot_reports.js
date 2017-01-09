const db = require('../models');
const auth = require('basic-auth');

function getBotReportsForLevel(req, res) {
  const level_id = req.body.level_id;
  if (level_id) {
    const query = `SELECT * FROM bot_reports WHERE level_id = ${level_id} ORDER BY bot_reports."createdAt" DESC;`;
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
      .then(reports => res.send(JSON.stringify(reports)));
  }
}

function putBotReport(req, res) {
  const user = auth(req);
  const author = user ? user.name : 'test';
  const level_id = req.body.level_id;
  const case_cnt = req.body.case_cnt;
  const passability = req.body.passability * 100;
  const step_cnt_average = req.body.step_cnt_average;
  const target_progress_average = req.body.target_progress_average * 100;
  const target_absolute_progress_average = req.body.target_absolute_progress_average * 100;
  const score_average = req.body.score_average;
  const mixings_cnt_average = req.body.mixings_cnt_average;
  const step_variants_cnt_average = req.body.step_variants_cnt_average;
  const step_cnt_median = req.body.step_cnt_median;
  const target_progress_median = req.body.target_progress_median * 100;
  const target_absolute_progress_median = req.body.target_absolute_progress_median;
  const score_median = req.body.score_median;
  const mixings_cnt_median = req.body.mixings_cnt_median;
  const step_variants_cnt_median = req.body.step_variants_cnt_median;
  const step_left_average = req.body.step_left_average;
  const bot_replay = req.body.bot_replay;
  const strategy = req.body.strategy;
  const seed = req.body.seed;
  const super_items_created_average = req.body.super_items_created_average;
  db.bot_reports.build({
    author,
    level_id,
    case_cnt,
    passability,
    step_cnt_average,
    target_progress_average,
    target_absolute_progress_average,
    score_average,
    mixings_cnt_average,
    step_variants_cnt_average,
    step_cnt_median,
    target_progress_median,
    target_absolute_progress_median,
    score_median,
    mixings_cnt_median,
    step_variants_cnt_median,
    step_left_average,
    bot_replay,
    strategy,
    seed,
    super_items_created_average
  }).save()
    .then(() => getBotReportsForLevel(req, res));
}

module.exports = {
  put: putBotReport,
  post: getBotReportsForLevel
};
