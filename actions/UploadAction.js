import api from 'api/HappinessAPI';

/** 載入首頁資料 **/
export function uploadExcel(file) {
    return (dispatch, getState) => {
        return new api(getState().auth).uploadExcel(file).then((data)=> dispatch(receiveUploadResult(data.excelJson)));
    }
}

export function receiveUploadResult(res) {
    return {
        type: 'UPLOAD_FILE_RESULT',
        excelDataGrid: res
    }
}

export function uploadHeadshot(headFileId) {
  return (dispatch, getState) => {
    return new api(getState().auth).updateHeadshot(headFileId);
  }
}