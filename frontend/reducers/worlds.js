import * as actions from '../actions/worlds';

export const worlds = (state = [], action) => {
  switch (action.type) {
  case actions.RECEIVE_WORLDS:
    return action.worlds;
  default:
    return state;
  }
};

export const currentWorld = (state = {}, action) => {
  switch (action.type) {
  case actions.OPEN_WORLD:
    return action.world;
  case actions.CLOSE_WORLD:
    return {};
  default:
    return state;
  }
};

export const selectedWorld = (state = {}, action) => {
  switch (action.type) {
  case actions.SELECT_WORLD:
    return action.world;
  case actions.VIEW_WORLD:
    return action.world;
  default:
    return state;
  }
};

export const visibleWorlds = (state = [], action) => {
  switch (action.type) {
  case actions.RECEIVE_WORLDS:
    return action.worlds ? action.worlds : [];
  default:
    return state;
  }
};

export const newWorldModalShown = (state = false, action) => {
  switch (action.type) {
  case actions.SHOW_NEW_WORLD_MODAL:
    return true;
  case actions.CLOSE_NEW_WORLD_MODAL:
    return false;
  case actions.CREATE_WORLD:
    return false;
  default:
    return state;
  }
};

export const worldInfoModalShown = (state = false, action) => {
  switch (action.type) {
  case actions.SHOW_WORLD_INFO_MODAL:
    return true;
  case actions.CLOSE_WORLD_INFO_MODAL:
    return false;
  case actions.CREATE_WORLD:
    return false;
  default:
    return state;
  }
};

const chapterLevels = (state = [], action) => {
  switch (action.type) {
  case actions.ADD_CHAPTER_LEVEL:
    return [...state, { name: `Уровень ${state.length + 1}` }];
  case actions.DELETE_CHAPTER_LEVEL:
    const d = state.indexOf(action.level);
    return [...state.slice(0, d), ...state.slice(d + 1)];
  case actions.ASSIGN_LEVEL_ID:
    const index = state.indexOf(action.level);
    return [
      ...state.slice(0, index),
      { ...action.level, levelId: [parseInt(action.levelId, 10)] },
      ...state.slice(index + 1)
    ];
  default:
    return state;
  }
};

export const currentChapterLevel = (state = null, action) => {
  switch (action.type) {
  case actions.SHOW_ASSIGN_LEVEL_MODAL:
    return action.level;
  default:
    return state;
  }
};

export const currentChapter = (state = null, action) => {
  switch (action.type) {
  case actions.SHOW_ASSIGN_LEVEL_MODAL:
    return action.chapter;
  default:
    return state;
  }
};

export const chapters = (state = [], action) => {
  switch (action.type) {
  case actions.OPEN_WORLD:
    return action.world.world ? JSON.parse(action.world.world) : state;
  case actions.ADD_CHAPTER:
    return [
      ...state,
      { name: `Глава ${state.length + 1}`, levels: [] },
    ];
  case actions.ADD_CHAPTER_LEVEL:
    const index = state.indexOf(action.chapter);
    return [
      ...state.slice(0, index),
      { ...action.chapter, levels: chapterLevels(action.chapter.levels, action) },
      ...state.slice(index + 1)
    ];
  case actions.ASSIGN_LEVEL_ID:
    const i = state.indexOf(action.chapter);
    return [
      ...state.slice(0, i),
      { ...action.chapter, levels: chapterLevels(action.chapter.levels, action) },
      ...state.slice(i + 1)
    ];
  case actions.DELETE_CHAPTER:
    const j = state.indexOf(action.chapter);
    return [
      ...state.slice(0, j),
      ...state.slice(j + 1)
    ];
  case actions.DELETE_CHAPTER_LEVEL:
    const idx = state.indexOf(action.chapter);
    return [
      ...state.slice(0, idx),
      { ...action.chapter, levels: chapterLevels(action.chapter.levels, action) },
      ...state.slice(idx + 1)
    ];
  default:
    return state;
  }
};

export const assignLevelModalShown = (state = false, action) => {
  switch (action.type) {
  case actions.SHOW_ASSIGN_LEVEL_MODAL:
    return true;
  case actions.CLOSE_ASSIGN_LEVEL_MODAL:
    return false;
  case actions.ASSIGN_LEVEL_ID:
    return false;
  default:
    return state;
  }
};
