import { backend } from '../actions/backend';
import { SHOW_KARMA_MAP_MODAL, SHOW_KARMA_PRESETS_MODAL } from '../reducers/karma';

export const openKarmaMapEditor = (karma_map) => ({ type: SHOW_KARMA_MAP_MODAL, karma_map });

export const openKarmaPresetsEditor = (karma_presets) => ({ type: SHOW_KARMA_PRESETS_MODAL, karma_presets });

export const getKarmaMap = () => backend('/karma', 'post');

export const setKarmaMap = karma_map => backend('/karma', 'put', karma_map);