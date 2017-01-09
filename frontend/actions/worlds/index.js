import * as api from './api';
import { beforeOpenModal, beforeCloseModal } from '../modal';

export const ADD_CHAPTER = 'ADD_CHAPTER';
export const DELETE_CHAPTER = 'DELETE_CHAPTER';
export const DELETE_CHAPTER_LEVEL = 'DELETE_CHAPTER_LEVEL';
export const ADD_CHAPTER_LEVEL = 'ADD_CHAPTER_LEVEL';
export const ASSIGN_LEVEL_ID = 'ASSIGN_LEVEL_ID';
export const RECEIVE_WORLDS = 'RECEIVE_WORLDS';
export const REQUEST_WORLDS = 'REQUEST_WORLDS';
export const EDIT_WORLD = 'EDIT_WORLD';
export const SAVE_WORLD = 'SAVE_WORLD';
export const OPEN_WORLD = 'OPEN_WORLD';
export const CREATE_WORLD = 'CREATE_WORLD';
export const SELECT_WORLD = 'SELECT_WORLD';
export const DELETE_WORLD = 'DELETE_WORLD';
export const SHOW_NEW_WORLD_MODAL = 'SHOW_NEW_WORLD_MODAL';
export const CLOSE_NEW_WORLD_MODAL = 'CLOSE_NEW_WORLD_MODAL';
export const SHOW_WORLD_INFO_MODAL = 'SHOW_WORLD_INFO_MODAL';
export const CLOSE_WORLD_INFO_MODAL = 'CLOSE_WORLD_INFO_MODAL';
export const SHOW_ASSIGN_LEVEL_MODAL = 'SHOW_ASSIGN_LEVEL_MODAL';
export const CLOSE_ASSIGN_LEVEL_MODAL = 'CLOSE_ASSIGN_LEVEL_MODAL';

export const edit = params => dispatch => {
  dispatch({ type: EDIT_WORLD, params });
  // dispatch(closeWorldInfoModal());
  dispatch(api('post', params));
};

export const getWorlds = () => api.getWorlds();

export const createWorld = data => dispatch => {
  dispatch({ type: CREATE_WORLD, data });
  dispatch(api.createWorld(data));
};

export const remove = data => dispatch => {
  dispatch({ type: DELETE_WORLD, data });
  dispatch(api.removeWorld(data));
  dispatch(api.getWorlds());
};

export const showNewModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_NEW_WORLD_MODAL });
};

export const closeNewlModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_NEW_WORLD_MODAL });
};

export const selectWorld = world => ({ type: SELECT_WORLD, world });

export const openWorld = world => ({ type: OPEN_WORLD, world });

export const addChapter = () => ({ type: ADD_CHAPTER });

export const deleteChapter = chapter => ({ type: DELETE_CHAPTER, chapter });

export const deleteChapterLevel = (level, chapter) =>
  ({ type: DELETE_CHAPTER_LEVEL, level, chapter });

export const addChapterLevel = currentChapter =>
  ({ type: ADD_CHAPTER_LEVEL, chapter: currentChapter });

export const assignLevelId = (levelId, chapterLevel, chapter) =>
  ({ type: ASSIGN_LEVEL_ID, level: chapterLevel, levelId, chapter });

export const showAssignLevelModal = (level, chapter) => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_ASSIGN_LEVEL_MODAL, level, chapter });
};

export const closeAssignLevelModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_ASSIGN_LEVEL_MODAL });
};

export const saveWorld = chapters => (dispatch, getState) => {
  const result = { ...getState().currentWorld, world: JSON.stringify(chapters) };
  dispatch({ type: SAVE_WORLD, chapters: result });
  dispatch(api.editWorld(result));
};
