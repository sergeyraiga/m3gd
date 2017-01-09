import * as actions from '../actions';
import { DELETE_WORLD, OPEN_WORLD } from '../actions/worlds';
import { DELETE_FOLDER } from '../actions/folders';
import { RUN_LEVEL, APPLY_LEVEL, DELETE_LEVEL } from '../actions/levels';
import { OPEN_BOT_QUEUE_EDITOR, OPEN_ASSIGN_ITEM_MODAL } from '../actions/bot_queue';

const tabs_info = {
  levels: { name: 'Уровни' },
  folders: { name: 'Папки' },
  worlds: { name: 'Миры' }
};

const pageModes = [
  { id: 'EDITOR', name: 'Редактор' },
  { id: 'GAME', name: 'Игра' },
  { id: 'CATEGORIZATION', name: 'Категоризация' }
];

export const context = (state = 'flash', action) => {
  switch (action.type) {
  case OPEN_WORLD:
    return 'world';
  case RUN_LEVEL:
    return 'flash';
  case APPLY_LEVEL:
    return 'flash';
  case OPEN_BOT_QUEUE_EDITOR:
    return 'bot_queue_editor';
  default:
    return state;
  }
};

const converter = new com.sq.m3lib.levelParser();

export const levelConverter = (state = converter) => state;

export const application = (state = { username: '', spinner: true, karma_map: '', karma_presets: '' }, action) => {
  switch (action.type) {
  case actions.REQUEST_DATA:
    return { ...state, spinner: true };
  case actions.RUN_BOT:
    return { ...state, spinner: true };
  case actions.END_BOT:
    return { ...state, spinner: false };
  case actions.INIT_APP:
    return {
      ...state,
      username: action.data.username,
      assets_url: action.data.assets_url,
      manifest: action.data.manifest,
      server_url: action.data.server_url,
      karma_map: action.data.karma_map,
      karma_presets: action.data.karma_presets
    };
  case actions.RECEIVE_DATA:
    return { ...state, spinner: false };
  default:
    return state;
  }
};

export const editor = (state = null, action) => {
  switch (action.type) {
  case actions.EDITOR_READY:
    return action.editor;
  default:
    return state;
  }
};

export const game = (state = null, action) => {
  switch (action.type) {
  case actions.GAME_READY:
    return action.game;
  default:
    return state;
  }
};

export const modes = (state = pageModes) => state;

export const mode = (state = 'EDITOR', action) => {
  switch (action.type) {
  case actions.SWITCH_MODE:
    return action.mode;
  default:
    return state;
  }
};

export const tabs = (state = tabs_info) => state;

export const currentLeftPanelTab = (state = 'levels', action) => {
  switch (action.type) {
  case actions.SWITCH_LEFT_PANEL_TAB:
    return action.tab;
  default:
    return state;
  }
};

export const submitDeleteModalShown = (state = false, action) => {
  switch (action.type) {
  case actions.SHOW_SUBMIT_DELETE_MODAL:
    return true;
  case actions.CLOSE_SUBMIT_DELETE_MODAL:
    return false;
  case DELETE_LEVEL:
    return false;
  case DELETE_FOLDER:
    return false;
  case DELETE_WORLD:
    return false;
  default:
    return state;
  }
};

export const currentModal = (state = null, action) => {
  switch (action.type) {
  case OPEN_ASSIGN_ITEM_MODAL:
    return action.item;
  default:
    return state;
  }
};
