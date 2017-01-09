import * as api from './api';
import { beforeOpenModal, beforeCloseModal } from '../modal';
import { switchMode } from '../index';
import { filterData } from '../../utils';

const FIELDS = ['id', 'author', 'name'];

export const CREATE_LEVEL = 'CREATE_LEVEL';
export const PLAY_LEVEL = 'PLAY_LEVEL';
export const APPLY_LEVEL = 'APPLY_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const RUN_LEVEL = 'RUN_LEVEL';
export const VIEW_LEVEL = 'VIEW_LEVEL';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const SELECT_LEVEL = 'SELECT_LEVEL';
export const FILTER_LEVELS = 'FILTER_LEVELS';
export const SHOW_LEVEL_INFO_MODAL = 'SHOW_LEVEL_INFO_MODAL';
export const CLOSE_LEVEL_INFO_MODAL = 'CLOSE_LEVEL_INFO_MODAL';
export const SHOW_MOVE_LEVEL_MODAL = 'SHOW_MOVE_LEVEL_MODAL';
export const CLOSE_MOVE_LEVEL_MODAL = 'CLOSE_MOVE_LEVEL_MODAL';
export const SHOW_NEW_LEVEL_MODAL = 'SHOW_NEW_LEVEL_MODAL';
export const CLOSE_NEW_LEVEL_MODAL = 'CLOSE_NEW_LEVEL_MODAL';
export const SHOW_IMPORT_LEVEL_MODAL = 'SHOW_IMPORT_LEVEL_MODAL';
export const CLOSE_IMPORT_LEVEL_MODAL = 'CLOSE_IMPORT_LEVEL_MODAL';

import {CLOSE_KARMA_MAP_MODAL, CLOSE_KARMA_PRESETS_MODAL} from '../../reducers/karma';
import {CLOSE_BOT_END_MODAL} from '../../actions/bot';

export const createLevel = data => dispatch => {
  dispatch({ type: CREATE_LEVEL, data });
  dispatch(api.createLevel(data));
};

export const getLevels = () => api.getLevels();

const convertLevel = (level, getState) => {
  const converter = getState().levelConverter;
  return converter.parse(level);
};

export const convertLevelAndSave = (name, desc = '', level) => (dispatch, getState) => {
  const convertedLevel = convertLevel(level, getState);
  dispatch(createLevel({ name, description: desc, level: convertedLevel }));
};

export const runLevel = level => (dispatch, getState) => {
  const game = getState().game;
  if (game) {
    game.loadLevel(level.level);
  }
  dispatch({ type: RUN_LEVEL, level });
  dispatch(switchMode('GAME'));
};

export const viewLevel = level => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: VIEW_LEVEL, level });
  dispatch({ type: SHOW_LEVEL_INFO_MODAL });
};

export const closeMoveLevelModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_MOVE_LEVEL_MODAL });
};

export const closeLevelInfoModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_LEVEL_INFO_MODAL });
};

export const moveLevel = (level_id, folder_id) => dispatch => {
  dispatch(api.moveLevel({ level_id, folder_id }));
  dispatch(closeMoveLevelModal());
};

export const editLevel = params => dispatch => {
  dispatch({ type: EDIT_LEVEL, params });
  dispatch(closeLevelInfoModal());
  dispatch(api.editLevel(params));
};

export const updateLevel = params => dispatch => {
  dispatch({ type: SAVE_LEVEL, level: params.level });
  dispatch(api.editLevel(params));
};

export const selectLevel = level => ({ type: SELECT_LEVEL, level });

export const showMoveLevelModal = level => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch(selectLevel(level));
  dispatch({ type: SHOW_MOVE_LEVEL_MODAL });
};

export const playLevel = level => (dispatch, getState) => {
  dispatch({ type: PLAY_LEVEL, level });
  const game = getState().game;
  if (game) {
    game.playLevel(level.level);
  }
  else {
    beforeOpenModal(getState);
    dispatch(switchMode('GAME'));
  }
};

export const applyLevel = level => (dispatch, getState) => {
  const editor = getState().editor;
  if (editor) {
    editor.loadLevel(level.level);
  }
  dispatch({ type: APPLY_LEVEL, level });
};

export const deleteLevel = data => dispatch => {
  dispatch({ type: DELETE_LEVEL, data });
  dispatch(api.deleteLevel(data));
};

export const showNewLevelModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_NEW_LEVEL_MODAL });
};

export const closeNewLevelModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_NEW_LEVEL_MODAL });
};

export const showImportLevelModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_IMPORT_LEVEL_MODAL });
};

export const closeImportLevelModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: CLOSE_IMPORT_LEVEL_MODAL });
};

export const filterLevels = (field, value) => (dispatch, getState) =>
  dispatch(filterData(getState().levelConfigs.configs, field, value, FIELDS, FILTER_LEVELS));

export const closeKarmaMapModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_KARMA_MAP_MODAL });
};

export const closeKarmaPresetsModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_KARMA_PRESETS_MODAL });
};

export const closeBotResultsModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_BOT_END_MODAL });
};