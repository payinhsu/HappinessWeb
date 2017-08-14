/** page reducers */
import { combineReducers } from 'redux'
import * as IndexPageReducers from './IndexPageReducer';
const pageReducers = combineReducers({...IndexPageReducers});
// const pageReducers = combineReducers({...IndexReducers, ...definitionReducers, ...memberReducers});
export default pageReducers;