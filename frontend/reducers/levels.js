import * as actions from '../actions';
import { OPEN_WORLD } from '../actions/worlds';
import {
  CREATE_LEVEL, RUN_LEVEL, SHOW_LEVEL_INFO_MODAL, VIEW_LEVEL, SAVE_LEVEL,
  CLOSE_MOVE_LEVEL_MODAL, SELECT_LEVEL, SHOW_MOVE_LEVEL_MODAL, EDIT_LEVEL,
  CLOSE_LEVEL_INFO_MODAL, APPLY_LEVEL, SHOW_NEW_LEVEL_MODAL, CLOSE_NEW_LEVEL_MODAL,
  SHOW_IMPORT_LEVEL_MODAL, CLOSE_IMPORT_LEVEL_MODAL, FILTER_LEVELS
} from '../actions/levels';

export const visibleLevels = (state = [], action) => {
  switch (action.type) {
  case FILTER_LEVELS:
    return action.result;
  case actions.RECEIVE_DATA:
    return action.configs ? action.configs : [];
  case actions.MOVE_CARD:
    const card = state[action.dragIndex];
    const removed = [
      ...state.slice(0, action.dragIndex),
      ...state.slice(action.dragIndex + 1)
    ];
    return [
      ...removed.slice(0, action.hoverIndex),
      card,
      ...removed.slice(action.hoverIndex)
    ];
  default:
    return state;
  }
};

export const newLevelModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_NEW_LEVEL_MODAL:
    return true;
  case CLOSE_NEW_LEVEL_MODAL:
    return false;
  case CREATE_LEVEL:
    return false;
  default:
    return state;
  }
};

export const levelInfoModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_LEVEL_INFO_MODAL:
    return true;
  case CLOSE_LEVEL_INFO_MODAL:
    return false;
  case CREATE_LEVEL:
    return false;
  default:
    return state;
  }
};

export const levelConfigs = (state = { isFetching: false, configs: [] }, action) => {
  switch (action.type) {
  case actions.REQUEST_DATA:
    return { ...state, isFetching: true };
  case actions.RECEIVE_DATA:
    return { ...state, isFetching: false, configs: action.configs };
  default:
    return state;
  }
};

export const selectedLevel = (state = {}, action) => {
  switch (action.type) {
  case VIEW_LEVEL:
    return action.level;
  case SELECT_LEVEL:
    return action.level;
  case EDIT_LEVEL:
    return action.params;
  case OPEN_WORLD:
    return {};
  default:
    return state;
  }
};

export const currentLevel = (state = {}, action) => {
  switch (action.type) {
  case APPLY_LEVEL:
    return action.level;
  case RUN_LEVEL:
    return action.level;
  case SAVE_LEVEL:
    return { ...state, level: action.level };
  case OPEN_WORLD:
    return {};
  default:
    return state;
  }
};

export const moveLevelModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_MOVE_LEVEL_MODAL:
    return true;
  case CLOSE_MOVE_LEVEL_MODAL:
    return false;
  default:
    return state;
  }
};

export const importLevelModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_IMPORT_LEVEL_MODAL:
    return true;
  case CLOSE_IMPORT_LEVEL_MODAL:
    return false;
  case CREATE_LEVEL:
    return false;
  default:
    return state;
  }
};
