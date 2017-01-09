import Thread from '../utils/thread';
import { beforeOpenModal, beforeCloseModal } from './modal';
import { saveBotReport } from './bot_reports';

export const RUN_BOT = 'RUN_BOT';
export const END_BOT = 'END_BOT';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const SHOW_BOT_REPORT_MODAL = 'SHOW_BOT_REPORT_MODAL';
export const CLOSE_BOT_REPORT_MODAL = 'CLOSE_BOT_REPORT_MODAL';

export const SHOW_BOT_END_MODAL = 'SHOW_BOT_END_MODAL';
export const CLOSE_BOT_END_MODAL = 'CLOSE_BOT_END_MODAL';

export const BOT_RESULT_SELECTED = 'BOT_RESULT_SELECTED';
export const BOT_RESULT_UNSELECTED = 'BOT_RESULT_UNSELECTED';

const notifyMe = () => {
  if (!Notification) {
    console.log('Desktop notifications not available in your browser!');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  else {
    new Notification(
      'Бот',
      { icon: '/static/favicon.ico', body: 'Проход уровня завершен'}
    );
  }
};

const endBot = (id, result) => dispatch => {
  dispatch({ type: END_BOT, result, id });
  dispatch(openBotResultsModal(result, id));
  notifyMe();
};

const run = (id, params) => ({ type: RUN_BOT, params, id });

const end = (id, result) => endBot(id, result);

const updateProgress = (id, progress) => ({ type: UPDATE_PROGRESS, id, progress });

const process = (id, data) => {
  if (data.type === 'end') {
    return dispatch => dispatch(end(id, data.data));
  }
  return dispatch => dispatch(updateProgress(id, data.data));
};

const bot = (id, params) => dispatch => {
  dispatch(run(id, params));
  const thread = new Thread();
  thread.exec(
    { url: document.location, id, params },
    data => dispatch(process(id, data))
  );
};

export const showBotReportModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_BOT_REPORT_MODAL });
};

export const closeBotReportModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_BOT_REPORT_MODAL });
};

export const runBot = (params, id) => dispatch => dispatch(bot(id, params));


export const openBotResultsModal = (bot_results, bot_level_id) => ({ type: SHOW_BOT_END_MODAL, bot_results, bot_level_id });