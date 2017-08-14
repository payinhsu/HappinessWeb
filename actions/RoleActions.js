import api from 'api/HappinessAPI';

/** 取得企業員工清單 **/
export function getEnterpriseEmployeesRoles(enterpriseId) {
  return (dispatch, getState) => {
      return new api(getState().auth).getEnterpriseEmployeesRoles(enterpriseId).then((data) => dispatch(receiveEnterpriseEmployeesRoles(data)));
  }
}

export function receiveEnterpriseEmployeesRoles(data) {
  return {
    type: 'RECEIVE_ENTERPRISE_EMPLOYEES_ROLES',
    enterpriseEmployeesRoles: data.members
  }
}

/** 帳號停權 **/
export function terminateMember(enterpriseId, memberId) {
  return (dispatch, getState) => {
      return new api(getState().auth).terminateMember(memberId).then((data) => dispatch(getEnterpriseEmployeesRoles(enterpriseId)));
  }
}

/** 設定帳號角色 **/
export function updateMemberRoles(enterpriseId, memberId, model) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateMemberRoles(memberId, model).then((data) => dispatch(getEnterpriseEmployeesRoles(enterpriseId)));
  }
}