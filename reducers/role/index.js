/** role reducers */
import { combineReducers } from 'redux'
import * as IndexRoleReducers from './IndexRoleReducer';
const roleReducers = combineReducers({...IndexRoleReducers});
export default roleReducers;