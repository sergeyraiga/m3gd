const path = require('path');
const fs = require('fs');

function getKarmaMap(req, res){
    const p = path.join(__dirname, '/../config/karma.json');
    res.send(fs.readFileSync(p, 'utf8'));
    console.log(fs.readFileSync(p, 'utf8'));
}

function setKarmaMap(req, res){
    console.log(req.body);
}

module.exports = {
    post: getKarmaMap,
    put: setKarmaMap
};