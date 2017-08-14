import api from 'api/HappinessAPI';

/** 取得照顧機構清單 **/
export function getCareInstitutions(name  = "") {
  return (dispatch, getState) => {
      return new api(getState().auth).getCareInstitutions(name).then((data) =>  dispatch(receiveCareInstitutions(data)));
  }
}

export function receiveCareInstitutions(data) {
  return {
      type: 'RECEIVE_CARE_INSTITUTIONS',
      institutions : data.institutions
  }
}

/** 取得照顧機構 **/
export function getCareInstitution(institutionId) {
	return (dispatch, getState) => {
      return new api(getState().auth).getCareInstitution(institutionId).then((data) =>  dispatch(receiveCareInstitution(data)));
  }
}

export function receiveCareInstitution(data) {
	return {
      type: 'RECEIVE_CARE_INSTITUTION',
      institution : data
  }
}

/** 新增照顧機構 **/
export function createInstitution(model) {
  return (dispatch, getState) => {
      return new api(getState().auth).createInstitution(model).then((data) =>  dispatch(getCareInstitutions()));
  }
}

/** 取得照顧機構員工清單 **/
export function getInstitutionEmployees(institutionId) {
  return (dispatch, getState) => {
      return new api(getState().auth).getInstitutionEmployees(institutionId).then((data) =>  dispatch(receiveInstitutionEmployees(data)));
  }
}

export function receiveInstitutionEmployees(data) {
  return {
      type: 'RECEIVE_CARE_INSTITUTION_EMPLOYEES',
      employees : data.employees
  }
}

/** 變更照顧機構聯絡人 **/
export function updateInstitutionContact(contactType, em, institutionId) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateInstitutionContact(contactType, em.memberId, institutionId).then((data) =>  dispatch(getCareInstitutions()));
  }
}

export function updateInstitution(institutionId, model) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateInstitution(institutionId, model).then((data) =>  dispatch(getCareInstitutions()));
  }
}

/**
 * 取得機構照顧管家清單(getCareInsitutionGivers)
 * /careInstitution/{institutionId}/careGivers
 */
export function getCareInsitutionGivers(institutionId) {
    return (dispatch, getState) => {
        return new api(getState().auth).getCareInsitutionGivers(institutionId).then((data) =>  dispatch(receiveCareInsitutionGivers(data)));
    }
}

export function receiveCareInsitutionGivers(data) {
    return {
        type: 'RECEIVE_CARE_INSTITUTION_GIVERS',
        givers : data.givers
    }
}

/**
 * 批次加入機構照顧管家(upsertCareInsitutionGivers)
 */
export function upsertCareInsitutionGivers(institutionId,input) {
    return (dispatch, getState) => {
        return new api(getState().auth).upsertCareInsitutionGivers(institutionId,input).then((data)=> dispatch(receiveUpsertCareInsitutionGiversResult(data))).then((data) => dispatch(getCareInsitutionGivers(institutionId)));
    }
}

export function receiveUpsertCareInsitutionGiversResult(data) {
    return {
        type: 'UPSERT_CARE_INSTITUTION_GIVERS_RESULT',
        importGiversResult: {
            successRows : data.successRows,
            failRows : data.failRows,
            failReasons : data.failReasons
        }
    }
}

/**
 * 新增照顧管家 (機構)  createCareInstitutionGiver
 */
export function createCareInstitutionGiver(institutionId, input) {
    return (dispatch, getState) => {
        return new api(getState().auth).createCareInstitutionGiver(institutionId,input).then((data) => dispatch(getCareInsitutionGivers(institutionId)));
    }
}

/** 更新照顧經理 **/
export function updateInstitutionCareGiver(institutionId, memberId, input) {
    return (dispatch, getState) => {
        return new api(getState().auth).updateCareGiver(memberId, input).then((data)=> dispatch(getCareInsitutionGivers(institutionId)));
    }
}

/**
 * 照顧管家停權 (機構) (terminateCareGiver)
 * /careGiver/{memberId}/terminate
 */
export function terminateCareGiver(institutionId, memberId) {
    return (dispatch, getState) => {
        return new api(getState().auth).terminateCareGiver(memberId).then((data)=> dispatch(getCareInsitutionGivers(institutionId)));
    }
}


/** 取得照顧管家班表 getCareGiverShiftTable **/
export function getCareGiverShiftTable(memberId) {
    return (dispatch, getState) => {
        return new api(getState().auth).getCareGiverShiftTable(memberId).then((data) => dispatch(receiveCareGiverShifts(data)));
    }
}

/**
 * 新增照顧管家班表  createCareGiverShift
 */
export function createCareGiverShift(memberId, input) {
    return (dispatch, getState) => {
        return new api(getState().auth).createCareGiverShift(memberId, input).then((data)=> dispatch(getCareGiverShiftTable(memberId)));
    }
}

export function receiveCareGiverShifts(data) {
    return {
        type: 'RECEIVE_CARE_GIVER_SHIFTS',
        shifts : data.shifts
    }
}

/** 取得機構照顧管家總班表 getCareInstitutionShiftTable **/
export function getCareInstitutionShiftTable(institutionId) {
    return (dispatch, getState) => {
        return new api(getState().auth).getCareInstitutionShiftTable(institutionId).then((data) => dispatch(receiveCareInstitutionShiftTable(data)));
    }
}

export function receiveCareInstitutionShiftTable(data) {
    return {
        type: 'RECEIVE_CARE_INSTITUTION_SHIFT_TABLE',
        institutionShifts : data.shifts
    }
}

/**
 * 刪除照顧管家班表  deleteCalendarItem
 */
export function deleteCalendarItem(calendarId, institutionId) {
    return (dispatch, getState) => {
        return new api(getState().auth).deleteCalendarItem(calendarId).then((data)=> dispatch(getCareInstitutionShiftTable(institutionId)));
    }
}