/** reducers */
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';

// import * as courseReducers from './CourseReducer';
// const page = combineReducers({...pageReducers});
// const reducers = combineReducers({...pageReducers, ...definitionReducers, ...memberReducers});

import page				from './page';
import role 			from './role' ;
import enterprise 			from './enterprise' ;
import institution 			from './institution' ;
import {auth} 			from './AuthReducer';
import {excelDataGrid} 	from './UploadReducer';
import {definition} 	from './DefinitionReducer';
import {initialization} from './InitializationReducer';


/** export combined reducers used by app */
// export {auth, senior, master, management};
export {auth, page, role, enterprise, institution, excelDataGrid, definition, initialization, form};