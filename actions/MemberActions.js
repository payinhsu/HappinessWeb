import api from 'api/HappinessAPI';

/** 啟動email **/
export function enableEmail(verifyCode, password) {
  return (dispatch, getState) => {
  	console.log('action enableEmail...with-----verifyCode: ' + verifyCode + ", password: " + password);
  	return new api(getState().auth).enableEmail(verifyCode, password).then((data) => data);
  }
}