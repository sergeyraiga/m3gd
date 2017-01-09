module.exports = {
  save: function (name, chapters) {
    const ch = {};
    var iterator = 1;
    console.log(chapters);
    chapters.map((item, index) => { item.order = index; ch['chapter' + index] = item; });
    Object.keys(ch).map(item => {
      delete ch[item].name;
      const lvls = {};
      ch[item].levels.map((level, index) => {
        level.order = index;
        level.ids = level.levelId;
        delete level.name;
        delete level.levelId;
        lvls[iterator] = level; iterator++;
      });
      ch[item].levels = lvls;
    });
    return { levels_map: { chapters: ch, name } };
  }
};
