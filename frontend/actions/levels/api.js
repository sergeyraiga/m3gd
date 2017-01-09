import { backend } from '../backend';

const backendLevels = (method = 'get', data = null) => backend('/levels', method, data);

export const getLevels = () => backendLevels();

export const createLevel = data => backendLevels('put', data);

export const editLevel = data => backendLevels('post', data);

export const moveLevel = data => backend('/move_level', 'post', data);

export const deleteLevel = data => backendLevels('delete', data);
