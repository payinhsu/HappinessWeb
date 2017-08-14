import _ from 'lodash';

export function institutions(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_CARE_INSTITUTIONS':
	      return action.institutions;
	    default:
	      return state;
	}
}

export function institution(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_CARE_INSTITUTION':
	      return action.institution;
	    default:
	      return state;
	}
}

export function employees(state = {}, action) {
	switch(action.type) {
	    case 'RECEIVE_CARE_INSTITUTION_EMPLOYEES':
	      return action.employees;
	    default:
	      return state;
	}
}

export function givers(state = {}, action) {
	switch(action.type) {
		case 'RECEIVE_CARE_INSTITUTION_GIVERS':
			return action.givers;
		default:
			return state;
	}
}

export function importGiversResult(state = {}, action) {
	switch(action.type) {
		case 'UPSERT_CARE_INSTITUTION_GIVERS_RESULT':
			return action.importGiversResult;
		default:
			return state;
	}
}

export function shifts(state = {}, action) {
	switch(action.type) {
		case 'RECEIVE_CARE_GIVER_SHIFTS':
			return action.shifts;
		default:
			return state;
	}
}

export function institutionShifts(state = {}, action) {
	switch(action.type) {
		case 'RECEIVE_CARE_INSTITUTION_SHIFT_TABLE':
			return action.institutionShifts;
		default:
			return state;
	}
}