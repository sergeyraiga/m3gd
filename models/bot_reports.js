module.exports = (sequelize, DataTypes) => {
  const bot_reports = sequelize.define('bot_reports', {
    author: DataTypes.STRING,
    level_id: DataTypes.INTEGER,
    case_cnt: DataTypes.INTEGER,
    passability: DataTypes.INTEGER,
    step_cnt_average: DataTypes.FLOAT,
    target_progress_average: DataTypes.INTEGER,
    target_absolute_progress_average: DataTypes.INTEGER,
    score_average: DataTypes.INTEGER,
    mixings_cnt_average: DataTypes.INTEGER,
    step_variants_cnt_average: DataTypes.FLOAT,
    step_cnt_median: DataTypes.FLOAT,
    target_progress_median: DataTypes.INTEGER,
    target_absolute_progress_median: DataTypes.INTEGER,
    score_median: DataTypes.INTEGER,
    mixings_cnt_median: DataTypes.FLOAT,
    step_variants_cnt_median: DataTypes.FLOAT,
    step_left_average: DataTypes.FLOAT,
    bot_replay: DataTypes.TEXT,
    strategy: DataTypes.INTEGER,
    seed: DataTypes.INTEGER,
    super_items_created_average: DataTypes.INTEGER
  });
  return bot_reports;
};
