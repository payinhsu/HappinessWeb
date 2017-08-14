import api from 'api/HappinessAPI';

/** 取得企業客戶清單 **/
export function getEnterprises(name = "") {
  return (dispatch, getState) => {
    return new api(getState().auth).getEnterprises(name).then((data) =>  dispatch(receiveEnterprises(data)));
  }
}

export function receiveEnterprises(data) {
  return {
      type: 'RECEIVE_ENTERPRISES',
      enterprises: data.enterprises
  }
}

/** 新增企業客戶 **/
export function createEnterprise(model) {
	return (dispatch, getState) => {
	    return new api(getState().auth).createEnterprise(model).then((data) =>  dispatch(getEnterprises()));
	}
}

/** 取得企業客戶 **/
export function getEnterprise(enterpriseId) {
  return (dispatch, getState) => {
      return new api(getState().auth).getEnterprise(enterpriseId).then((data) =>  dispatch(receiveEnterprise(data)));
  }
}

export function receiveEnterprise(enterprise) {
  return {
      type: 'RECEIVE_ENTERPRISE',
      enterprise: enterprise
  }
}

/** 取得企業員工清單 **/
export function getEnterpriseEmployees(enterpriseId, selectStr) {
  return (dispatch, getState) => {
      return new api(getState().auth).getEnterpriseEmployees(enterpriseId, selectStr).then((data) =>  dispatch(receiveEnterpriseEmployees(data)));
  }
}

export function receiveEnterpriseEmployees(data) {
  return {
      type: 'RECEIVE_ENTERPRISE_EMPLOYEES',
      employees : data.employees
  }
}

/** 企業員工停權(leaveEnterprise) - 離職 **/
export function leaveEnterprise(enterpriseId,memberId,leaveDate){
    return (dispatch, getState) => {
        return new api(getState().auth).leaveEnterprise(memberId,leaveDate).then((data) =>  dispatch(getEnterpriseEmployees(enterpriseId,"{\"status\":\"ALL\"}")));
    }
}

/** 變更企業聯絡人 **/
export function updateEnterpriseContact(contactType, em, enterpriseId) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateEnterpriseContact(contactType, em.memberId, enterpriseId).then((data) =>  dispatch(getEnterprises()));
  }
}

/** 更新企業客戶 **/
export function updateEnterprise(enterpriseId, model) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateEnterprise(enterpriseId, model).then((data) =>  dispatch(getEnterprises()));
  }
}

/**
 * 批次上傳員工資料(upsertEnterpriseEmployees)
 */
export function upsertEnterpriseEmployees(enterpriseId,input) {
    return (dispatch, getState) => {
        return new api(getState().auth).upsertEnterpriseEmployees(enterpriseId,input).then((data)=> dispatch(receiveUpsertEnterpriseEmployeesResult(data))).then((data) => dispatch(getEnterpriseEmployees(enterpriseId,"{\"status\":\"ALL\"}")));
    }
}

export function receiveUpsertEnterpriseEmployeesResult(data) {
    return {
        type: 'UPSERT_ENTERPRISE_EMPLOYEES_RESULT',
        importFileResult: {
            successRows : data.successRows,
            failRows : data.failRows,
            failReasons : data.failReasons
        }
    }
}

/** 新增單筆企業員工資料 **/
export function createEnterpriseEmployee(enterpriseId, employee, memberId) {
    return (dispatch, getState) => {
        return new api(getState().auth).createEnterpriseEmployee(enterpriseId,employee).then((data) => dispatch(getEnterpriseEmployees(enterpriseId,"{\"status\":\"ALL\"}")));
    }
}
