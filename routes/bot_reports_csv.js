const db = require('../models');
const csv = require('express-csv');

function getBotReportsForLevel(req, res) {
  const level_id = req.body.level_id;
  if (level_id) {
    res.setHeader('Content-Disposition', `attachment; filename="level_${level_id}.csv"`);
    const query = `SELECT * FROM bot_reports WHERE level_id = ${level_id};`;
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
      .then(reports => {
        const headers = {};
        Object.keys(reports[0]).map(header => (headers[header] = header));
        console.log(headers);
        var resultWithHeaders = [];
        resultWithHeaders.push(headers);
        resultWithHeaders = resultWithHeaders.concat(reports);
        res.csv(resultWithHeaders);
      });
  }
}

module.exports = {
  post: getBotReportsForLevel
};
