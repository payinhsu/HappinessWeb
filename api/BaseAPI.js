
import axios from 'axios';

export default class BaseAPI{
  constructor(name, API_BASE_URL) {
    this.name = name;
    this.API_BASE_URL = API_BASE_URL;
  }

  get(apiPath, params, token){
  	const url = this.API_BASE_URL + apiPath;
    console.log('with header: ' + JSON.stringify({Authorization: `Bearer ${token}`}))

    return axios.get(url, {
      headers: {Authorization: `Bearer ${token}`},
      params
    }).then(this.checkResponse).catch(this.checkResponse);
  }

  put(apiPath, params, token){
  	const url = this.API_BASE_URL + apiPath;
    console.log('putting > ' + url);
    console.log('with header: ' + JSON.stringify({Authorization: `Bearer ${token}`}))

    return axios.put(url, params, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(this.checkResponse).catch(this.checkResponse);
  }

  post(apiPath, params, token){
  	const url = this.API_BASE_URL + apiPath;
    console.log('posting > ' + url);
    console.log('with header: ' + JSON.stringify({Authorization: `Bearer ${token}`}))

    return axios.post(url, params, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(this.checkResponse).catch(this.checkResponse);
  }

  del(apiPath, params, token){
    const url = this.API_BASE_URL + apiPath;
    console.log('deleting > ' + url);
    console.log('with header: ' + JSON.stringify({Authorization: `Bearer ${token}`}))

    return axios.delete(url, {
      headers: {Authorization: `Bearer ${token}`},
      params
    }).then(this.checkResponse).catch(this.checkResponse);
  }

  checkResponse(resp){
    if(resp.data && resp.data.returnCode && resp.data.returnCode && resp.data.returnCode === '000'){
      return resp;
    }
    else{
      console.log(`into alert > resp.data.returnCode: ${resp.data.returnCode}, resp.data.message: ${resp.data.message}`);
      alert(resp.data.message);
      return Promise.reject(resp.data.message);
    }
  }

  isSuccess(resp){
    return resp && resp.returnCode && resp.returnCode === '000';
  }
}