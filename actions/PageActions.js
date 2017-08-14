import api from 'api/HappinessAPI';

// export function login(email, pass) {
// 	return (dispatch, getState) => {
// 	    return new api(getState().auth).login(email,pass).then((data)=> dispatch(receiveLogin(data)));
// 	}
// }

// export function receiveLogin(data) {
// 	return {
// 		type: 'LOGIN', 
// 		data: data
// 	}
// }
/****/
export function updateAuth() {
  return (dispatch, getState) => {
    return  new api(getState().auth).updateAuth().then((resp)=> dispatch(receiveAuth(resp))) ;
  }
}

export function receiveAuth(resp) {
  return {
        type: 'HAPPINESS_RECEIVE_AUTH',
        data: resp.data
    }
}

/** 更新員工資料 **/
export function updateEmployeeInfo(memberId, model) {
	return (dispatch, getState) => {
	    return new api(getState().auth).updateEmployee(memberId, model) ;
	}
}

/** 載入首頁資料 **/
export function getPageIndex() {
  return (dispatch, getState) => {
    return new api(getState().auth).getIndexPage().then((data)=> dispatch(receivePageIndex(data.videos, data.knowledges, data.givers)));
  }
}

export function receivePageIndex(videos, knowledges, givers) {
  return {
    type: 'RECEIVE_PAGE_INDEX',
    pageData: {videos: videos, knowledges: knowledges, givers: givers}
  }
}

export function getYouTubeInfo(param) {
	return (dispatch, getState) => {
	    return new api(getState().auth).getYouTubeInfo(param).then((data)=> dispatch(receiveYouTubeInfo(data)));
	  }
}

export function receiveYouTubeInfo(data) {
	return {
	    type: 'RECEIVE_YOUTUBE_INFO',
	    youtubeInfo: data
	}
}

/** 加入員工保障對象 **/
export function addInsurant(memberId, model) {
	return (dispatch, getState) => {
		return new api(getState().auth).addInsurant(memberId,model).then((success) => 
			dispatch(getInsurants(memberId)));
  	}
}

/** 更新員工保障對象 **/
export function updateInsurant(memberId, model) {
	return (dispatch, getState) => {
		return new api(getState().auth).updateInsurant(model).then((success) => 
			dispatch(getInsurants(memberId)));
  	}
}

/** 取得員工保障對象清單 **/
export function getInsurants(memberId) {
	return (dispatch, getState) => {
		return new api(getState().auth).getInsurants(memberId).then((insurants) => 
			dispatch(receiveMemberInsurantList(insurants)));
  	}
}

export function receiveMemberInsurantList(insurants) {
	return {
	    type: 'RECEIVE_MEMBER_INSURANT_LIST',
	    insurants: insurants
	}
}

/** 終止自費保障對象 **/
export function terminateInsurant(memberId, model) {
	return (dispatch, getState) => {
		return new api(getState().auth).terminateInsurant(model).then((success) =>  dispatch(getInsurants(memberId)));
  	}
}

/** 轉換員工公司保障對象 (由指定自費對象取代) **/
export function changeMainInsurant(memberId, model) {;
	return (dispatch, getState) => {
		return new api(getState().auth).changeMainInsurant(memberId, model).then((success) =>  dispatch(getInsurants(memberId)));
  	}
}

/** 取得員工保障對象變更紀錄 **/
export function getInsurantsChangeLogs(memberId, year) {
	return (dispatch, getState) => {
		return new api(getState().auth).getInsurantsChangeLogs(memberId, year).then((data) =>  dispatch(receiveInsurantsChangeLogs(data)));
  	}
}

export function receiveInsurantsChangeLogs(data) {
	return {
	    type: 'RECEIVE_INSURANTS_CHANGE_LOGS',
	    insurantsChangeLogs: data.changeLogs
	}
}

// export function updateEmployee(model) {
// 	return (dispatch, getState) => {
// 	    return new api(getState().auth).updateEmployee(model).then((data)=> dispatch(receivePageIndex(data.videos, data.knowledges, data.givers)));
// 	}
// }

/** api sample from master web **/
// export function getCourseDef(courseDefId) {
//   return (dispatch, getState) => {
//     return new api(getState().auth).getCourseDef(courseDefId).then((courseDef)=> dispatch(receiveCourseDef(courseDef)));
//   }
// }

// export function receiveCourseDef(courseDef) {
//   return {
//     type: 'RECEIVE_COURSE_DETAIL',
//     courseDef: courseDef
//   }
// }

// export function createCourseDef(courseDef){
//   return (dispatch, getState) => {
//     return new api(getState().auth).createCourseDef(courseDef).then((success)=> dispatch(getCourseDefs()));
//   }
// }

// export function updateCourseDef(courseDef){
//   return (dispatch, getState) => {
//     return new api(getState().auth).updateCourseDef(courseDef).then((success)=> dispatch(getCourseDefs()));
//   }
// }