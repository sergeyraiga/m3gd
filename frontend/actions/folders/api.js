import { backend } from '../backend';

export const RECEIVE_FOLDERS = 'RECEIVE_FOLDERS';
export const REQUEST_FOLDERS = 'REQUEST_FOLDERS';

const receiveFolders = folders => ({ type: RECEIVE_FOLDERS, folders });

const requestFolders = params => ({ type: REQUEST_FOLDERS, params });

const backendFolders = (method = 'get', data = null) => backend(
  '/folders', method, data,
  json => requestFolders(json), json => receiveFolders(json)
);

export const getFolders = () => backendFolders();

export const deleteFolder = data => backendFolders('delete', data);

export const createFolder = data => backendFolders('put', data);

export const editFolder = data => backendFolders('post', data);
