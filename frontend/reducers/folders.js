import * as actions from '../actions';
import {
  OPEN_FOLDER, SELECT_FOLDER, CLOSE_FOLDER, CREATE_FOLDER, RECEIVE_FOLDERS,
  SHOW_FOLDER_INFO_MODAL, CLOSE_FOLDER_INFO_MODAL, VIEW_FOLDER,
  SHOW_NEW_FOLDER_MODAL, CLOSE_NEW_FOLDER_MODAL, FILTER_FOLDERS
} from '../actions/folders';

export const folders = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_FOLDERS:
    return action.folders;
  default:
    return state;
  }
};

export const currentFolder = (state = {}, action) => {
  switch (action.type) {
  case OPEN_FOLDER:
    return action.folder;
  case CLOSE_FOLDER:
    return {};
  case actions.SWITCH_LEFT_PANEL_TAB:
    return action.tab !== 'folders' ? {} : state;
  default:
    return state;
  }
};

export const selectedFolder = (state = {}, action) => {
  switch (action.type) {
  case SELECT_FOLDER:
    return action.folder;
  case VIEW_FOLDER:
    return action.folder;
  default:
    return state;
  }
};

export const visibleFolders = (state = [], action) => {
  switch (action.type) {
  case FILTER_FOLDERS:
    return action.result;
  case RECEIVE_FOLDERS:
    return action.folders ? action.folders : [];
  default:
    return state;
  }
};

export const newFolderModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_NEW_FOLDER_MODAL:
    return true;
  case CLOSE_NEW_FOLDER_MODAL:
    return false;
  case CREATE_FOLDER:
    return false;
  default:
    return state;
  }
};

export const folderInfoModalShown = (state = false, action) => {
  switch (action.type) {
  case SHOW_FOLDER_INFO_MODAL:
    return true;
  case CLOSE_FOLDER_INFO_MODAL:
    return false;
  case CREATE_FOLDER:
    return false;
  default:
    return state;
  }
};
