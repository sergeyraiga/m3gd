import * as api from './api';

export const SAVE_BOT_REPORT = 'SAVE_BOT_REPORT';
export const SET_CURRENT_BOT_REPORT = 'SET_CURRENT_BOT_REPORT';

export const getBotReportsForLevel = level_id =>
  api.getBotReportsForLevel({ level_id });

export const saveBotReport = report => dispatch => {
  dispatch({ type: SAVE_BOT_REPORT, report });
  dispatch(api.saveBotReport(report));
};

export const setCurrentBotReport = report => ({ type: SET_CURRENT_BOT_REPORT, report });
