import { backend } from '../backend';

export const RECEIVE_BOT_REPORTS = 'RECEIVE_BOT_REPORTS';
export const REQUEST_BOT_REPORTS = 'REQUEST_BOT_REPORTS';

const receiveBotReports = reports => ({ type: RECEIVE_BOT_REPORTS, reports });

const requestBotReports = params => ({ type: REQUEST_BOT_REPORTS, params });

const backendBotReports = (method = 'get', data = null) => backend(
  '/bot_reports', method, data,
  json => requestBotReports(json), json => receiveBotReports(json)
);

export const getBotReportsForLevel = data => backendBotReports('post', data);

export const saveBotReport = data => backendBotReports('put', data);
