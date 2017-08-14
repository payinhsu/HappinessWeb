/** page reducers */
import { combineReducers } from 'redux'
import * as IndexInstitutionReducers from './IndexInstitutionReducer';
const institutionReducers = combineReducers({...IndexInstitutionReducers});
// const pageReducers = combineReducers({...IndexReducers, ...definitionReducers, ...memberReducers});
export default institutionReducers;