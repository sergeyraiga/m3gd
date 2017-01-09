const db = require('../models');

function getBotReplayForReport(req, res) {
    const id = req.body.id;
    if (id) {
        res.setHeader('Content-Disposition', `attachment; filename="replay_report_${id}.json"`);
        const query = `SELECT bot_replay FROM bot_reports WHERE id = ${id};`;
        db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
            .then(replay => {
                console.log('get replay = ', id);
                res.send(replay[0].bot_replay);
            });
    }
}
module.exports = {
    post: getBotReplayForReport
};
