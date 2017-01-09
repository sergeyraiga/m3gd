import { beforeOpenModal, beforeCloseModal } from './modal';
import { playLevel } from './levels';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const SORT_CONFIGS = 'SORT_CONFIGS';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const EDITOR_READY = 'EDITOR_READY';
export const GAME_READY = 'GAME_READY';
export const INIT_APP = 'INIT_APP';
export const SWITCH_MODE = 'SWITCH_MODE';
export const CHANGE_RANGE_PARAMS = 'CHANGE_RANGE_PARAMS';
export const SHOW_SUBMIT_DELETE_MODAL = 'SHOW_SUBMIT_DELETE_MODAL';
export const CLOSE_SUBMIT_DELETE_MODAL = 'CLOSE_SUBMIT_DELETE_MODAL';
export const PUSH_BOT_QUEUE = 'PUSH_BOT_QUEUE';
export const SWITCH_LEFT_PANEL_TAB = 'SWITCH_LEFT_PANEL_TAB';
export const MOVE_CARD = 'MOVE_CARD';

// function filterConfigs(state, field, value) {
//   const configs = state.configs;
//   let result = [];
//   const all = ['id', 'author', 'name'];
//   if (field === 'all') {
//     all.map((key) => {
//       const tmp = configs.filter(item => item[key].toString().indexOf(value) !== -1);
//       tmp.map((t) => {
//         if (result.indexOf(t) === -1) {
//           result.push(t);
//         }
//       });
//     });
//   }
//   else {
//     result = configs.filter(item => item[field].indexOf(value) !== -1);
//   }
//   return { type: FILTER_CONFIGS, configs: result };
// }

export const moveCard = (dragIndex, hoverIndex) => ({ type: MOVE_CARD, dragIndex, hoverIndex });

// export const filterConfigsByValue = (field, value, filterType) =>
//   (dispatch, getState) =>
//     dispatch(filterConfigs(getState().levelConfigs, field, value, filterType));

export const showSubmitDeleteModal = () => (dispatch, getState) => {
  beforeOpenModal(getState);
  dispatch({ type: SHOW_SUBMIT_DELETE_MODAL });
};

export const closeSubmitDeleteModal = () => (dispatch, getState) => {
  beforeCloseModal(getState);
  dispatch({ type: CLOSE_SUBMIT_DELETE_MODAL });
};

export const editorReady = editor => (dispatch, getState) => {
  const editorDOM = editor.getFPDOMNode();
  dispatch({ type: EDITOR_READY, editor: editorDOM });
  try {
    editorDOM.loadLevel(getState().currentLevel.level);
  }
  catch (err) {
    console.log(err);
  }
  dispatch({ type: LOAD_LEVEL });
};

export const switchMode = mode => ({ type: SWITCH_MODE, mode });

export const changeRangeParams = (name, value) =>
  ({ type: CHANGE_RANGE_PARAMS, name, value });

export const switchLeftPanelTab = tab => ({ type: SWITCH_LEFT_PANEL_TAB, tab });

export const gameReady = game => (dispatch, getState) => {
  const gameDOM = game.getFPDOMNode();
  dispatch({ type: GAME_READY, game: gameDOM });
  dispatch(playLevel(getState().currentLevel));
};
