/** page reducers */
import { combineReducers } from 'redux'
import * as IndexEnterpriseReducers from './IndexEnterpriseReducer';
const enterpriseReducers = combineReducers({...IndexEnterpriseReducers});
// const pageReducers = combineReducers({...IndexReducers, ...definitionReducers, ...memberReducers});
export default enterpriseReducers;