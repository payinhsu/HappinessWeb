import axios from 'axios';
import config from 'config';
import BaseAPI from './BaseAPI';

const APP_TOKEN = '8e387797-da95-4366-9578-74714b61effc';
const API_BASE_URL = config.happinessAPIUrl;

export default class MasterAPI extends BaseAPI {
  constructor(auth) {
    super('SeniorAPI', API_BASE_URL, APP_TOKEN);
    this.token = auth ? auth.accessToken : APP_TOKEN;
    this.auth = auth;
    if(auth) this.USER_TOKEN = auth.accessToken;
  }

  updateAuth() {
     return axios.get("/member").then((resp) => { 
        if(resp.data && resp.data.returnCode && resp.data.returnCode && resp.data.returnCode === '000'){
          return resp;
        }
        else{
          console.log(`into alert > resp.data.returnCode: ${resp.data.returnCode}, resp.data.message: ${resp.data.message}`);
          alert(resp.data.message);
          return Promise.reject(resp.data.message);
        }});
  }

  login(email, password) {
    return this.post(`/member/login`, {email, password}, APP_TOKEN).then((resp) => resp.data); 
  }
  
  logout() {
    return this.get(`/member/logout`, null, this.auth.accessToken).then((resp) => resp.data); 
  }

  getBanks() {
    return this.get(`/definition/banks`, null, this.auth.accessToken).then((resp) => resp.data); 
  }

  getBusinessManagers() {
    return this.get(`/definition/businessManagers`, null, this.auth.accessToken).then((resp) => resp.data); 
  }

  checkAuth(memberId, checkAuth) {
    return this.post(`/member/${memberId}/checkAuth`, checkAuth, this.auth.accessToken).then((resp) => resp.data);
  }
  
  getMemberByToken(accessToken) {
    return this.get(`/member`, null, this.auth.accessToken).then((resp) => resp.data);  
  }
  
  terminateInsurant(terminateInsurantModel) {
    return this.put(`/insurant/${terminateInsurantModel.insurantId}/terminate`, terminateInsurantModel, this.auth.accessToken).then((resp) => resp.data) ;
  }

  getIndexPage(){
    return this.get(`/page/index`, null, APP_TOKEN).then((resp) => resp.data);
  }

  s3presignedurl(param) {
    return this.get(`/document/s3presignedurl`, null, this.auth.accessToken).then((resp) => resp.data) ;
  }

  getYouTubeInfo(param) {
    return this.get(`/document/youtubeinfo?s3ObjectKeyOrYoutubeId=${param}`, null, APP_TOKEN).then((resp) => resp.data) ;
  }

  uploadExcel(file){
    return this.post(`/common/excelToJson`, file, this.auth.accessToken).then((resp) => resp.data);
  }

  updateYouTubeInfo(s3ObjectKeyOrYoutubeId, model) {
    return this.put(`/document/youtubeinfo/${s3ObjectKeyOrYoutubeId}`, model, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  /** {  teachers, categories, organizations } */
  getDefinitions() {
    return this.get(`/mapping/collectionsUtil`, null, this.auth.accessToken).then((resp) => (
      {
        cities: resp.data.cities,
        diseases: resp.data.diseases,
        insurantRelationships: resp.data.insurantRelationships
      }
    ));
  }

  getSignature(paramObj){           // paramObj: {fileName, fileType, convertType, memberId}
    return this.post(`/document/signature`, paramObj, this.auth.accessToken).then((resp) => resp.data.signature);
  }

  getFileUrl(fileKey, tags){          // resp.data => {fileKey:'', tags:[]}
    return this.post(`/document/fileUrl`, {fileKey, tags}, this.auth.accessToken).then((resp) => resp.data);
  }

  updateEmployee(memberId, model) {
    return this.put(`/member/${memberId}/employee`, model, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  addInsurant(memberId, model) {
    return this.post(`/member/${memberId}/insurant`, model, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  updateInsurant(model) {
    return this.put(`/insurant/${model.id}`, model, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  changeMainInsurant(memberId, model) {
    return this.put(`/member/${memberId}/mainInsurant`, model, this.auth.accessToken).then((resp)=> this.isSuccess(resp.data));
  }

  getInsurants(memberId) {
    return this.get(`/member/${memberId}/insurants`, null, this.auth.accessToken).then((resp) => resp.data.insurants);
  }

  getInsurantsChangeLogs(memberId,year) {
    return this.get(`/member/${memberId}/insurantsChangeLogs?year=${year}`, null, this.auth.accessToken).then((resp) => resp.data );
  }

  getPermissions() {
    return this.get(`/definition/permissions`, null, this.auth.accessToken).then((resp) => resp.data.permissionGroups );
  }

  getRoles() {
    return this.get(`/definition/roles`, null, this.auth.accessToken).then((resp) => resp.data.roles) ;
  }

  createRole(role) {
    return this.post(`/role`, role, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  updateRole(role) {
    return this.put(`/role/${role.id}`, role, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  updateHeadshot(headFileId) {
    return this.put(`/member/${this.auth.id}/headshot`, headFileId, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  getEnterprises(name) {
    return this.get(`/enterprises?name=${name}`,null,this.auth.accessToken).then((resp) => resp.data) ;
  }

  createEnterprise(model) {
    return this.post(`/enterprise`, model, this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  getCareManagers() {
    return this.get(`/definition/careManagers`, null, this.auth.accessToken).then((resp) => resp.data) ;
  }

  getEnterpriseEmployeesRoles(enterpriseId) {
    return this.get(`/enterprise/${enterpriseId}/employeesRoles`,null,this.auth.accessToken).then((resp) => resp.data);
  }

  terminateMember(memberId) {
    return this.put(`/member/${memberId}/terminate`,null,this.auth.accessToken).then((resp) => resp.data);
  }

  updateMemberRoles(memberId, model) {
    return this.put(`/member/${memberId}/roles`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  getEnterprise(enterpriseId) {
    return this.get(`/enterprise/${enterpriseId}`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  getEnterpriseEmployees(enterpriseId, selectStr) {
      selectStr
    return this.get(`/enterprise/${enterpriseId}/employees?input=${selectStr}`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  updateEnterpriseContact(contactType, newContactId, enterpriseId) {
    return this.put(`/enterprise/${enterpriseId}/contact`,{contactType:contactType, newContactId:newContactId}, this.auth.accessToken).then((resp) => resp.data);
  }

  updateEnterprise(enterpriseId, model) {
    return this.put(`/enterprise/${enterpriseId}`,model, this.auth.accessToken).then((resp) => resp.data);
  }

  getCareInstitutions(name) {
    return this.get(`/careInstitutions?name=${name}`,null, this.auth.accessToken).then((resp) => resp.data);
  }

  getCareInstitution(institutionId) {
    return this.get(`/careInstitution/${institutionId}`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  createInstitution(model) {
    return this.post(`/careInstitution`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  enableEmail(verifyCode, password) {
    return this.put(`/enableEmail`, {"verifyCode": verifyCode, "password": password}, APP_TOKEN).then((resp) => this.isSuccess(resp.data));
  }

  getInstitutionEmployees(institutionId) {
    return this.get(`/careInstitution/${institutionId}/employees`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  updateInstitutionContact(contactType, newContactId, institutionId) {
    return this.put(`/careInstitution/${institutionId}/contact`,{contactType:contactType, newContactId:newContactId}, this.auth.accessToken).then((resp) => resp.data);
  }

  updateInstitution(institutionId, model) {
    return this.put(`/careInstitution/${institutionId}`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  leaveEnterprise(memberId,leaveDate) {
    return this.put(`/member/${memberId}/leaveDate`,leaveDate,this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  getCustomerDevelopers() {
    return this.get(`/definition/customerDevelopers`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  createCareManager(model) {
    return this.post(`/careManager`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  getCareManager(memberId) {
    return this.get(`/careManager/${memberId}`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  updateCareManager(memberId, model) {
    return this.put(`/careManager/${memberId}`, model, this.auth.accessToken).then((resp) => resp.data);
  }
  /**
   * 批次上傳員工資料(upsertEnterpriseEmployees)
   */
  upsertEnterpriseEmployees(enterpriseId,input) {
    return this.put(`/enterprise/${enterpriseId}/employee`,input,this.auth.accessToken).then((resp) => resp.data);
  }

  getCareGivers() {
    return this.get(`/definition/careGivers`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  createCareGiver(model) {
    return this.post(`/careGiver`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 更新照顧管家(updateCareGiver)
   * /careGiver/{memberId}
   * 更新照顧經管家  (照顧管家本人、營運管理者都可能會使用)
   */
  updateCareGiver(memberId, model) {
    return this.put(`/careGiver/${memberId}`, model, this.auth.accessToken).then((resp) => resp.data);
  }

  getCareGiver(memberId) {
    return this.get(`/careGiver/${memberId}`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  createEnterpriseEmployee(enterpriseId,employee) {
    return this.post(`/enterprise/${enterpriseId}/employee`,employee,this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  getMemberByPermissionId(permissionId) {
    return this.get(`/permission/${permissionId}/members`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  getCareInsitutionGivers(institutionId) {
    return this.get(`/careInstitution/${institutionId}/careGivers`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  getDefinitionApi(url) {
    return this.get(url, null, this.auth.accessToken).then((resp) => resp.data);
  }


  /**
   * 批次加入機構照顧管家(upsertCareInsitutionGivers)
   */
  upsertCareInsitutionGivers(institutionId,input) {
    return this.put(`/careInstitution/${institutionId}/careGivers`,input,this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 新增照顧管家 (機構)  createCareInstitutionGiver
   */
  createCareInstitutionGiver(institutionId,input) {
    return this.post(`/careInstitution/${institutionId}/careGiver`,input,this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 取得證照清單(getSkills)
   */
  getSkills() {
    return this.get(`/definition/skills`,null,this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 取得專長清單(getAbilities)
   */
  getAbilities() {
    return this.get(`/definition/abilities`,null,this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 照顧管家停權 (機構) (terminateCareGiver)
   */
  terminateCareGiver(memberId) {
    return this.put(`/careGiver/${memberId}/terminate`,null,this.auth.accessToken).then((resp) => this.isSuccess(resp.data));
  }

  /**
   * 取得照顧管家排班表 (getCareGiverShiftTable)
   * /careGiver/{memberId}/shiftTable
   * 取得照顧管家排班資料
   */
  getCareGiverShiftTable(memberId) {
    return this.get(`/careGiver/${memberId}/shiftTable`, null, this.auth.accessToken).then((resp) => resp.data);
  }


  /**
   * 新增照顧管家排班表 createCareGiverShift
   */
  createCareGiverShift(memberId, input) {
    return this.post(`/careGiver/${memberId}/shift`, input, this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 取得照顧管家排班表 (getCareInstitutionShiftTable)
   * /careInstitution/{institutionId}/shiftTable
   * 取得照顧管家排班資料
   */
  getCareInstitutionShiftTable(institutionId) {
    return this.get(`/careInstitution/${institutionId}/shiftTable`, null, this.auth.accessToken).then((resp) => resp.data);
  }

  /**
   * 刪除照顧管家排班表 deleteCalendarItem
   */
  deleteCalendarItem(calendarId) {
    return this.del(`/calendar/${calendarId}`, null, this.auth.accessToken).then((resp) => resp.data);
  }  
}