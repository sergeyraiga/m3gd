import * as actions from '../actions/bot';
import { RECEIVE_BOT_REPORTS, REQUEST_BOT_REPORTS } from '../actions/bot_reports/api';
import { SET_CURRENT_BOT_REPORT } from '../actions/bot_reports';
import { END_BOT } from '../actions/bot';
import {
  OPEN_ASSIGN_ITEM_MODAL, CLOSE_ASSIGN_ITEM_MODAL,
  ADD_BOT_TASK, REMOVE_BOT_TASK, ASSIGN_ITEM, SET_CURRENT_TASK
} from '../actions/bot_queue';
import { SHOW_BOT_END_MODAL, CLOSE_BOT_END_MODAL } from '../actions/bot';

export const bot = (state = {}, action) => {
  switch (action.type) {
  case actions.RUN_BOT:
    return { ...state, [action.id]: 'running' };
  case actions.END_BOT:
    return { ...state, [action.id]: 'done' };
  default:
    return state;
  }
};

export const runBotResult = (state = {}, action) => {
  switch (action.type) {
  case SET_CURRENT_BOT_REPORT:
    return action.report;
  default:
    return state;
  }
};

export const runBotResults = (state = [], action) => {
  switch (action.type) {
    case END_BOT:
      return action.result;
    default:
      return state;
  }
};

export const bot_level_id = (state = null, action) => {
  switch (action.type) {
    case SHOW_BOT_END_MODAL:
      return action.bot_level_id;
    default:
      return state;
  }
};

export const botRunProgress = (state = [], action) => {
  switch (action.type) {
  case actions.RUN_BOT:
    return [0, 0, 0];
  case actions.END_BOT:
    return [];
  case actions.UPDATE_PROGRESS:
    return action.progress;
  default:
    return state;
  }
};

export const botReportModalShown = (state = false, action) => {
  switch (action.type) {
  case actions.SHOW_BOT_REPORT_MODAL:
    return true;
  case actions.CLOSE_BOT_REPORT_MODAL:
    return false;
  default:
    return state;
  }
};

export const assignItemModalShown = (state = false, action) => {
  switch (action.type) {
  case OPEN_ASSIGN_ITEM_MODAL:
    return true;
  case CLOSE_ASSIGN_ITEM_MODAL:
    return false;
  case ASSIGN_ITEM:
    return false;
  default:
    return state;
  }
};

export const botReports = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_BOT_REPORTS:
    return action.reports;
  case REQUEST_BOT_REPORTS:
    return [];
  default:
    return state;
  }
};

export const currentTask = (state = null, action) => {
  switch (action.type) {
  case SET_CURRENT_TASK:
    return action.id;
  default:
    return state;
  }
};

const bot_task = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
  case ASSIGN_ITEM:
    return { ...state, [action.item]: [...state[action.item], action.value] };
  default:
    return state;
  }
};

export const botQueue = (state = [], action) => {
  switch (action.type) {
  case ADD_BOT_TASK:
    return [
      ...state,
      { id: state.length, levels: [], folders: [], properties: {} }];
  case REMOVE_BOT_TASK:
  const t = state.indexOf(action.task);
  return [
    ...state.slice(0, t),
    ...state.slice(t + 1)
  ];
  case ASSIGN_ITEM:
    return [
      ...state.slice(0, action.id),
      bot_task(state[action.id], action),
      ...state.slice(action.id + 1)
    ];
  default:
    return state;
  }
};

export const botResultsModalShown = (state = false, action) => {
  switch (action.type) {
    case actions.SHOW_BOT_END_MODAL:
      return true;
    case actions.CLOSE_BOT_END_MODAL:
      return false;
    default:
      return state;
  }
};

export const botResultSelected = (state = false, action) => {
  switch (action.type) {
    case actions.BOT_RESULT_SELECTED:
      return true;
    case actions.BOT_RESULT_UNSELECTED:
      return false;
    default:
      return state;
  }
};
