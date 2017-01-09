export const OPEN_BOT_QUEUE_EDITOR = 'OPEN_BOT_QUEUE_EDITOR';
export const OPEN_ASSIGN_ITEM_MODAL = 'OPEN_ASSIGN_ITEM_MODAL';
export const CLOSE_ASSIGN_ITEM_MODAL = 'CLOSE_ASSIGN_ITEM_MODAL';
export const ASSIGN_ITEM = 'ASSIGN_ITEM';
export const ADD_BOT_TASK = 'ADD_BOT_TASK';
export const REMOVE_BOT_TASK = 'REMOVE_BOT_TASK';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';

export const SHOW_KARMA_INFO_MODAL = 'SHOW_KARMA_INFO_MODAL';
export const CLOSE_KARMA_INFO_MODAL = 'CLOSE_KARMA_INFO_MODAL';
export const SHOW_KARMA_MAP_MODAL = 'SHOW_KARMA_MAP_INFO_MODAL';
export const CLOSE_KARMA_MAP_MODAL = 'CLOSE_KARMA_MAP_INFO_MODAL';

export const openQueueEditor = () => ({ type: OPEN_BOT_QUEUE_EDITOR });

export const openAssignItemModal = item =>
  ({ type: OPEN_ASSIGN_ITEM_MODAL, item });

export const closeAssignItemModal = () => ({ type: CLOSE_ASSIGN_ITEM_MODAL });

export const assignItem = (item, value, id) =>
  ({ type: ASSIGN_ITEM, item, value, id });

export const addTask = () => ({ type: ADD_BOT_TASK });

export const removeTask = task => ({ type: REMOVE_BOT_TASK, task });

export const setCurrentTask = id => ({ type: SET_CURRENT_TASK, id });

export const openKarmaMapEditor = () => ({ type: SHOW_KARMA_INFO_MODAL });

export const openKarmaPresetsEditor = () => ({ type: SHOW_KARMA_MAP_MODAL });
