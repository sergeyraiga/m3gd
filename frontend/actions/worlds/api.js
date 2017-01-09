import { backend } from '../backend';
import { RECEIVE_WORLDS, REQUEST_WORLDS } from './index';

const receive = worlds => ({ type: RECEIVE_WORLDS, worlds });

const request = params => ({ type: REQUEST_WORLDS, params });

const backendWorlds = (method = 'get', params = null) =>
  backend('/worlds', method, params, json => request(json), json => receive(json));

export const editWorld = data => backendWorlds('post', data);

export const createWorld = data => backendWorlds('put', data);

export const removeWorld = data => backendWorlds('delete', data);

export const getWorlds = () => backendWorlds();
