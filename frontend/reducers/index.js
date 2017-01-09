import { combineReducers } from 'redux';
import * as categorization from './categorization';
import * as levels from './levels';
import * as folders from './folders';
import * as bot from './bot';
import * as application from './application';
import * as worlds from './worlds';
import * as karma from './karma';

export default combineReducers({
  ...application,
  ...levels,
  ...folders,
  ...worlds,
  ...categorization,
  ...bot,
  ...karma
});
