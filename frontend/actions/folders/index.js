import * as api from './api';
import { backend } from '../backend';
import { beforeOpenModal, beforeCloseModal } from '../modal';
import { getLevels } from '../levels';
import { filterData } from '../../utils';

const FIELDS = ['id', 'author', 'name'];

export const RECEIVE_FOLDERS = api.RECEIVE_FOLDERS;
export const REQUEST_FOLDERS = api.REQUEST_FOLDERS;

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const OPEN_FOLDER = 'OPEN_FOLDER';
export const SELECT_FOLDER = 'SELECT_FOLDER';
export const CLOSE_FOLDER = 'CLOSE_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const EDIT_FOLDER = 'EDIT_FOLDER';
export const VIEW_FOLDER = 'VIEW_FOLDER';

export const FILTER_FOLDERS = 'FILTER_FOLDERS';

export const SHOW_FOLDER_INFO_MODAL = 'SHOW_FOLDER_INFO_MODAL';
export const CLOSE_FOLDER_INFO_MODAL = 'CLOSE_FOLDER_INFO_MODAL';

export const SHOW_NEW_FOLDER_MODAL = 'SHOW_NEW_FOLDER_MODAL';
export const CLOSE_NEW_FOLDER_MODAL = 'CLOSE_NEW_FOLDER_MODAL';

export const getFolderLevels = folder_id => backend('/levels', 'post', { folder_id });

export const openFolder = folder => ({ type: OPEN_FOLDER, folder });

export const closeFolder = () => ({ type: CLOSE_FOLDER });

export const selectFolder = folder => ({ type: SELECT_FOLDER, folder });

export const createFolder = data => dispatch => {
  dispatch({ type: CREATE_FOLDER, data });
  dispatch(api.createFolder(data));
};

export const getFolders = () => api.getFolders();

export const closeFolderInfoModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_FOLDER_INFO_MODAL });
};

export const editFolder = params => dispatch => {
  dispatch({ type: EDIT_FOLDER, params });
  dispatch(closeFolderInfoModal());
  dispatch(api.editFolder(params));
};

export const deleteFolder = data => dispatch => {
  dispatch({ type: DELETE_FOLDER, data });
  dispatch(api.deleteFolder(data));
  dispatch(getLevels());
};

export const viewFolder = folder => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: VIEW_FOLDER, folder });
  dispatch({ type: SHOW_FOLDER_INFO_MODAL });
};

export const showNewFolderModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_NEW_FOLDER_MODAL });
};

export const closeNewFolderModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_NEW_FOLDER_MODAL });
};

export const filterFolders = (field, value) => (dispatch, getState) =>
  dispatch(filterData(getState().folders, field, value, FIELDS, FILTER_FOLDERS));
