import fetch from 'isomorphic-fetch';
import { RECEIVE_DATA, REQUEST_DATA, INIT_APP } from './index';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
};

const credentials = 'same-origin';

export const receiveData = json => ({
  type: RECEIVE_DATA,
  configs: json.configs,
  receivedAt: Date.now()
});

export const requestData = params => ({ type: REQUEST_DATA, params });

export const init = () => dispatch => {
  const newInit = { method: 'get', credentials, headers };
  const newRequest = new Request('/init', newInit);
  return fetch(newRequest, newInit).then(response => response.json()).then(
    json => dispatch({ type: INIT_APP, data: json })
  );
};

export const backend = (
  route = '/levels', method = 'get', params,
  onReq = requestData, onRecv = receiveData
) => dispatch => {
  dispatch(onReq(params));
  const newInit = { method, credentials, headers };
  if (params) {
    newInit.body = JSON.stringify(params);
  }
  const newRequest = new Request(route, newInit);
  return fetch(newRequest, newInit)
    .then(response => response.json())
    .then(json => dispatch(onRecv(json)));
};
