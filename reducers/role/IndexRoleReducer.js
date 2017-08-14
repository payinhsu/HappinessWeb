import _ from 'lodash';

export function enterpriseEmployees(state = {}, action) {
  switch(action.type) {
    case 'RECEIVE_ENTERPRISE_EMPLOYEES_ROLES': 
      return action.enterpriseEmployeesRoles ;
    default:
      return state ;
  }
}
