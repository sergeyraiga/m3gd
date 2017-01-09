export const SHOW_KARMA_MAP_MODAL = 'SHOW_KARMA_INFO_MODAL';
export const CLOSE_KARMA_MAP_MODAL = 'CLOSE_KARMA_INFO_MODAL';
export const SHOW_KARMA_PRESETS_MODAL = 'SHOW_KARMA_MAP_INFO_MODAL';
export const CLOSE_KARMA_PRESETS_MODAL = 'CLOSE_KARMA_MAP_INFO_MODAL';
export const KARMA_MAP = 'KARMA_MAP';


export const karmaMapModalShown = (state = false, action) => {
    switch (action.type) {
        case SHOW_KARMA_MAP_MODAL:
            return true;
        case CLOSE_KARMA_MAP_MODAL:
            return false;
        default:
            return state;
    }
};

export const karmaPresetsModalShown = (state = false, action) => {
    switch (action.type) {
        case SHOW_KARMA_PRESETS_MODAL:
            return true;
        case CLOSE_KARMA_PRESETS_MODAL:
            return false;
        default:
            return state;
    }
};

export const karma_map = (state = '', action) => {
    switch (action.type) {
        case SHOW_KARMA_MAP_MODAL:
            return action.karma_map;
        default:
            return state;
    }
};

export const karma_presets = (state = '', action) => {
    switch (action.type) {
        case SHOW_KARMA_PRESETS_MODAL:
            return action.karma_presets;
        default:
            return state;
    }
};