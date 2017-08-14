/** load definitions */

import api from 'api/HappinessAPI';

/**
 * {  teachers, categories, organizations }
 */
export function getDefinitions() {
  return (dispatch, getState) => {
    return new api(getState().auth).getDefinitions().then((definitions)=> dispatch(receiveDefinitions(definitions)));
  }
}

export function receiveDefinitions(definitions){
    return {
        type: 'HAPPINESS_RECEIVE_DEFINITIONS',
        definitions
    }
}

/****/
export function getBanks() {
  return (dispatch, getState) => {
    return new api(getState().auth).getBanks().then((data)=> dispatch(receiveBanks(data)));
  }
}

export function receiveBanks(data) {
  return {
      type: 'RECEIVE_BANKS',
      banks: data.banks
    }
}

/** 取得權限清單 **/
export function getPermissions() {
  return (dispatch, getState) => {
    return new api(getState().auth).getPermissions().then((permissionGroups)=> dispatch(receivePermissions(permissionGroups)));
  }
}

export function receivePermissions(permissionGroups) {
	return {
	    type: 'RECEIVE_PERMISSIONS',
	    permissionGroups: permissionGroups
	  }
}

/** 取得照顧經理清單 **/
export function getCareManagers() {
  return (dispatch, getState) => {
    return new api(getState().auth).getCareManagers().then((data)=> dispatch(receiveCareManagers(data)));
  }
}

export function receiveCareManagers(data) {
  return {
      type: 'RECEIVE_CARE_MANAGERS',
      careManagers: data.careManagers
    }
}

/** 新增照顧經理 **/
export function createCareManager(model) {
  return (dispatch, getState) => {
    return new api(getState().auth).createCareManager(model).then((data)=> dispatch(getCareManagers()));
  }
}

/** 取得照顧經理 **/
export function getCareManager(memberId) {
  return (dispatch, getState) => {
    return new api(getState().auth).getCareManager(memberId).then((data)=> dispatch(receiveCareManager(data)));
  }
}

/** 更新照顧經理 **/
export function updateCareManager(memberId, model) {
  return (dispatch, getState) => {
    return new api(getState().auth).updateCareManager(memberId, model).then((data)=> dispatch(getCareManagers()));
  }
}

export function receiveCareManager(data) {
  return {
      type: 'RECEIVE_CARE_MANAGER',
      careManager: data
    }
}

/** 取得業務經理清單 **/
export function getBusinessManagers() {
  return (dispatch, getState) => {
    return new api(getState().auth).getBusinessManagers().then((data)=> dispatch(receiveBusinessManagers(data)));
  }
}

export function receiveBusinessManagers(data) {
  return {
      type: 'RECEIVE_BUSINESS_MANAGERS',
      businessManagers: data.businessManagers
    }
}

/** 取得角色清單 **/
export function getRoles() {
  return (dispatch, getState) => {
    return new api(getState().auth).getRoles().then((data) => dispatch(receiveRoles(data)));
  }
}

export function receiveRoles(roles) {
  return {
    type: 'RECEIVE_ROLES',
    roles: roles
  }
}

/** 新增角色 **/
export function createRole(role) {
  return (dispatch, getState) => {
      return new api(getState().auth).createRole(role).then((data) => dispatch(getRoles()));
  }
}

/** 更新角色 **/
export function updateRole(role) {
  return (dispatch, getState) => {
      return new api(getState().auth).updateRole(role).then((data) => dispatch(getRoles()));
  }
}

/** 取得"客戶開發"清單 **/
export function getCustomerDevelopers() {
  return (dispatch, getState) => {
      return new api(getState().auth).getCustomerDevelopers().then((data) => dispatch(receiveCustomerDevelopers(data)));
  }
}

export function receiveCustomerDevelopers(data) {
  return {
    type: 'RECEIVE_CUSTOMER_DEVELOPER',
    customerDevelopers: data.customerDevelopers
  }
}

/** 依權限取得會員清單 **/
export function getMemberByPermissionId(permissionId) {
  return (dispatch, getState) => {
      return new api(getState().auth).getMemberByPermissionId(permissionId).then((data) => dispatch(receiveMemberByPermissionId(data)));
  }
}

export function receiveMemberByPermissionId(data) {
  return {
    type: 'RECEIVE_MEMBER_BY_PERMISSIONID',
    members: data.members
  }
}

/** 取得照顧管家清單 **/
export function getCareGivers() {
  return (dispatch, getState) => {
      return new api(getState().auth).getCareGivers().then((data) =>  dispatch(receiveCareGivers(data)));
  }
}

export function receiveCareGivers(data) {
  return {
    type: 'RECEIVE_CARE_GIVERS',
    careGivers: data.careGivers
  }
}

/** 新增照顧管家 **/
export function createCareGiver(model) {
  return (dispatch, getState) => {
      return new api(getState().auth).createCareGiver(model).then((data) =>  dispatch(getCareGivers()));
  }
}

/** 更新照顧經理 **/
export function updateCareGiver(memberId, model) {
  return (dispatch, getState) => {
    return new api(getState().auth).updateCareGiver(memberId, model).then((data)=> dispatch(getCareGivers()));
  }
}

/** 取得照顧管家 **/
export function getCareGiver(memberId) {
  return (dispatch, getState) => {
    return new api(getState().auth).getCareGiver(memberId).then((data)=> dispatch(receiveCareGiver(data)));
  }
}

export function receiveCareGiver(data) {
  return {
      type: 'RECEIVE_CARE_GIVER',
      careGiver: data
    }
}

/**
 * 取得證照清單(getSkills)
 */
export function getSkills() {
    return (dispatch, getState) => {
        return new api(getState().auth).getSkills().then((data)=> dispatch(receiveSkills(data)));
    }
}

export function receiveSkills(data){
    return {
        type: 'HAPPINESS_RECEIVE_SKILLS',
        skills: data.skills
    }
}

/**
 * 取得專長清單(getAbilities)
 */
export function getAbilities() {
    return (dispatch, getState) => {
        return new api(getState().auth).getAbilities().then((data)=> dispatch(receiveAbilities(data)));
    }
}

export function receiveAbilities(data){
    return {
        type: 'HAPPINESS_RECEIVE_ABILITIES',
        abilities: data.abilities
    }
}

/**
 *  更新照顧管家(素人) 之後call 取得照顧管家(getCareGiver)
 */
export function updatePersonalCareGiver(memberId, input) {
    return (dispatch, getState) => {
        return new api(getState().auth).updateCareGiver(memberId, input).then((data)=> dispatch(getCareGiver(memberId)));
    }
}