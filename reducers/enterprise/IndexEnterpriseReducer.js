import _ from 'lodash';

export function enterprises(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_ENTERPRISES':
	      return action.enterprises;
	    default:
	      return state;
	}
}

export function enterprise(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_ENTERPRISE':
	      return action.enterprise;
	    default:
	      return state;
	}
}

export function employees(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_ENTERPRISE_EMPLOYEES':
	      return action.employees;
	    default:
	      return state;
	}
}

export function importFileResult(state = {}, action) {
	switch(action.type) {
		case 'UPSERT_ENTERPRISE_EMPLOYEES_RESULT':
			return action.importFileResult;
		default:
			return state;
	}
}