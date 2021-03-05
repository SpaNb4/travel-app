import { combineReducers } from 'redux';
import reducer1 from './something1/reducer1';
import reducer2 from './something2/reducer2';

export default combineReducers({ reducer1, reducer2 });
