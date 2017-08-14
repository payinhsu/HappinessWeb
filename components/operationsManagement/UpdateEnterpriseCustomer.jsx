import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import ChangeContact from 'components/operationsManagement/ChangeContact' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';
import {Modal, Button, Image} from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

export default class AddEnterpriseCustomer extends React.Component {

    static contextTypes = {
        authData: React.PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open : props.open, 
            enterprise:props.enterprise,
            definition: props.definition,
            employees: props.employees,
            permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : [] ,
            contacts:[],
            contactType:"",
            subOpen: false,
            type:""
        }
        this.setState({contacts: this.toPageModel(this.state.enterprise.businessContacts, this.state.enterprise.financialContacts)});
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            enterprise:newProps.enterprise,
            definition: newProps.definition,
            employees: newProps.employees,
            contacts:[],
            contactType:"",
            subOpen: false,
            type:""
        };
        this.setState(nextState);
        this.setState({contacts: this.toPageModel(this.state.enterprise.businessContacts, this.state.enterprise.financialContacts)});
    };

    toPageModel = (businessContacts, financialContacts) => {
      // console.log(JSON.stringify(businessContacts) ) ;
      // console.log(JSON.stringify(financialContacts) ) ;
      let contact1 = businessContacts.map( bc =>  {
              return {"type": "businessContact",
              "id": bc.id,
              "sex":bc.sex,
              "employeeId": bc.employeeId,
              "familyName":bc.familyName,
              "firstName":bc.firstName,
              "cellphone":bc.cellphone,
              "email":bc.email,
              "companyTel":bc.companyTel,
              "companyTelExt":bc.companyTelExt}
            });
      let contact2 = (financialContacts.map(fc => {
              return {"type": "financialContact",
              "id": fc.id,
              "sex":fc.sex,
              "employeeId": fc.employeeId,
              "familyName":fc.familyName,
              "firstName":fc.firstName,
              "cellphone":fc.cellphone,
              "email":fc.email,
              "companyTel":fc.companyTel,
              "companyTelExt":fc.companyTelExt}
            }));
      return contact1.concat(contact2) ;
    };

    changeEnterprise(field, e){
        // console.log(e.target.value) ;
        this.state.enterprise[field] = e.target.value;
        this.setState({enterprise:this.state.enterprise});
        // console.log(JSON.stringify(this.state.enterprise));
    };

    changeEnterpriseOwner(field, e){
        // console.log(e.target.value) ;
        this.state.enterprise.owner[field] = e.target.value;
        this.setState({enterprise:this.state.enterprise});
        // console.log(JSON.stringify(this.state.enterprise));
    };

    changeEnterpriseInvoiceAddress(field, e){
        // console.log(e.target.value) ;
        this.state.enterprise.invoiceAddress[field] = e.target.value;
        this.setState({enterprise:this.state.enterprise});
        // console.log(JSON.stringify(this.state.enterprise));
    };

    // contact edit
    changeSelectContact = (e) => {
      this.setState({contactType:e.target.value});
    } ; 


    // process for change contact 
    openChangeContact = (type) => {
        this.setState({type:type});
        if(type=="CUSTOMER_DEV") {        // change customer developer
            this.setState({employees:this.state.definition.customerDevelopers}) ;
        } else if(type=="CARE_MANAGER") { // change care manager
            this.setState({employees:this.state.definition.careManagers}) ;
        } else {                          // change contact member
            this.setState({type:""});
            this.setState({employees:this.props.employees}) ;
        }
        
        this.setState({subOpen: true}) ;
    };
    onCloseChangeContact = () => {
      this.setState({subOpen: false}) ;
    };

    onCommitChangeContact = (type, em) => {      // master
        this.setState({subOpen: false}) ;  
        this.state.enterprise.masterContact = {
              "id": em.id,
              "sex": em.sex,
              "familyName": em.familyName,
              "firstName": em.firstName,
              "cellphone": em.cellphone,
              "email": em.email,
              "employeeId": em.employeeId,
              "companyTel": em.companyTel,
              "companyTelExt": em.companyTelExt
        }
        
        this.setState({enterprise: this.state.enterprise}) ;
    };

    onCommitContacts = (type, em) => {        
        this.setState({subOpen: false}) ;
        if(this.state.type =="CUSTOMER_DEV" ) {               // customer developer
            this.state.enterprise.customerDeveloper = {"id":em.id, "name":em.name} ;
        } else if(this.state.type =="CARE_MANAGER") {         // care manager
            this.state.enterprise.careManager = {"id":em.id, "name":em.name} ;
        } else {                                              // business or financial
            if(this.state.contacts.find(c => c.id == em.id) === undefined) {
                this.state.contacts.push(
                    { "type": type,
                      "id": em.id,
                      "sex":em.sex,
                      "familyName":em.familyName,
                      "firstName":em.firstName,
                      "cellphone":em.cellphone,
                      "email":em.email,
                      "employeeId":em.employeeId,
                      "companyTel":em.companyTel,
                      "companyTelExt":em.companyTelExt});
                this.setState({contacts:this.state.contacts});
            } 
        }
        this.setState({enterprise: this.state.enterprise}) ;
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    // process for update enterprise
    onUpdateEmployee(enterpriseId) {
      let model = {
        "tel": this.state.enterprise.tel,
        "fax": this.state.enterprise.fax,
        "owner" : {
          "sex": this.state.enterprise.owner.sex,
          "familyName": this.state.enterprise.owner.familyName,
          "firstName": this.state.enterprise.owner.firstName
        },
        "masterContactId": this.state.enterprise.masterContact.id, 
        "businessContactIds": this.state.contacts.filter(ct => ct.type === "businessContact").map(ct => ct.id),
        "financialContactIds": this.state.contacts.filter(ct => ct.type === "financialContact").map(ct => ct.id),
        "careManagerId": this.state.enterprise.careManager.id,
        "customerDeveloperId": this.state.enterprise.customerDeveloper.id,
        "invoiceAddress":{
            "zipCode":this.state.enterprise.invoiceAddress.zipCode,
            "cityId":this.state.enterprise.invoiceAddress.cityId,
            "zipId":this.state.enterprise.invoiceAddress.zipId,
            "address":this.state.enterprise.invoiceAddress.address
        },

      };
      // console.log("ready to update model : " + JSON.stringify(model)) ;
      this.props.updateEnterprise(enterpriseId, model) ;
    };

    addContact = () =>  {
        this.setState({employees:this.props.employees})
        if(this.state.contactType == "") {
          // do nothing
        } else {
            this.setState({type:this.state.contactType});
            this.setState({subOpen: true}) ;
        }
    };
    delContact = (index) => {
        // console.log("del " + index) ;
        this.state.contacts.splice(index,1) ;
        this.setState({contacts:this.state.contacts});
        // console.log("del " + JSON.stringify(this.state.contacts)) ;
    };

    generateContacts = (contact, index) => {
        return ([
            <tr className={index%2 == 0 ? "tr-lightblue":"tr-blue"}>
                <th rowSpan="2">
                  {contact.type == "businessContact" ? '業務聯繫人' : '財務聯繫人'} {`${index+1}`}<br/>
                  <Confirm onConfirm={this.delContact.bind(this, index)}
                            body={`確認刪除一零四資訊科技企業客戶業務聯繫人${contact.familyName}${contact.firstName}${contact.sex === '1' ? '先生': '小姐'}嗎?提醒刪除後，若需增加此筆資料，則需另行新增。`}
                            confirmText="確定"
                            cancelText="取消"
                            title="刪除企業客戶業務聯繫人資料">
                      <a href="javascript:void(0);">
                          <img src="/resource/del.png" alt="刪除"/>
                      </a>
                  </Confirm>
                </th>
                <th>*姓名</th>
                <td>
                    {contact.familyName}
                    {contact.firstName}
                    {contact.sex === '1' ? '先生': '小姐'}
                </td>
                <th>*電話</th>
                <td>
                    {contact.companyTel}
                </td>
                <th>*分機</th>
                <td>
                    {contact.companyTelExt}
                </td>
            </tr>,
            <tr className={index%2 == 0 ? "tr-lightblue":"tr-blue"}>
                <th>*員編</th>
                <td>
                    {contact.employeeId}
                </td>
                <th>*行動電話</th>
                <td>
                    {contact.cellphone}
                </td>
                <th>*E-mail</th>
                <td>
                    {contact.email}
                </td>
            </tr>
        ]);
    }
    render() {
        return(
          <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg"
            dialogClassName="my-modal">
            <Modal.Header closeButton>
                <Modal.Title><p>更新企業客戶資料</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <div id="portal">
              <div className="listBox">
                  <div className="box">
                      <tag>
                          <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th rowSpan="3">基本資料</th>
                                    <th>*公司名稱</th>
                                    <td colSpan="2">
                                        {this.state.enterprise.name}
                                    </td>
                                    <th>*公司簡稱</th>
                                    <td colSpan="3">
                                        {this.state.enterprise.abbreviation}
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*統編</th>
                                  <td>
                                      {this.state.enterprise.id}
                                  </td>
                                  <th>*負責人</th>
                                  <td colSpan="4">
                                    姓 : <input value={this.state.enterprise.owner.familyName}
                                                onChange={this.changeEnterpriseOwner.bind(this,'familyName')}/> 
                                    名 : <input value={this.state.enterprise.owner.firstName}
                                                onChange={this.changeEnterpriseOwner.bind(this,'firstName')}/>
                                    <input name="ownersex" type="radio" value="1" 
                                           onChange={this.changeEnterpriseOwner.bind(this,'sex')}
                                           checked={this.state.enterprise.owner.sex === '1'}/>先生
                                    <input name="ownersex" type="radio" value="0"
                                           onChange={this.changeEnterpriseOwner.bind(this,'sex')}
                                           checked={this.state.enterprise.owner.sex === '0'}/>小姐
                                  </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*電話</th>
                                  <td>
                                    <input value={this.state.enterprise.tel}
                                          onChange={this.changeEnterprise.bind(this,'tel')}/>
                                  </td>
                                  <th>傳真</th>
                                  <td colSpan='3'>
                                    <input value={this.state.enterprise.fax}
                                           onChange={this.changeEnterprise.bind(this,'fax')}/>
                                  </td>
                                </tr>
                                
                                <tr className="tr-lightblue">
                                  <th>*收款方式</th>
                                  <td colSpan="2">月結</td>
                                  <th>*交易方式</th>
                                  <td colSpan="3">
                                      { this.state.enterprise.transactionType == "1" ? '匯款' : 
                                        this.state.enterprise.transactionType == "2" ? '支票' :
                                        this.state.enterprise.transactionType == "3" ? '刷卡' :
                                        this.state.enterprise.transactionType == "4" ? 'ATM' : ''}
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*對帳日</th>
                                  <td colSpan="2">
                                    每月{this.state.enterprise.reconciliationDate}日
                                  </td>
                                  <th>*請款日</th>
                                  <td colSpan="3">
                                    每月{this.state.enterprise.invoiceDate}日
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*發票類型</th>
                                  <td colSpan="2">
                                      <div>
                                        {this.state.enterprise.invoiceType == "2" ? '二聯式' : '三聯式' }
                                      </div> 
                                  </td>
                                  <th>*發票抬頭</th>
                                  <td colSpan="3">
                                    {this.state.enterprise.invoiceTitle}
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*發票地址</th>
                                  <td colSpan="6">
                                      <input placeHolder="郵遞區號" value={this.state.enterprise.invoiceAddress.zipCode}
                                           onChange={this.changeEnterpriseInvoiceAddress.bind(this,'zipCode')}/>
                                      <select value={this.state.enterprise.invoiceAddress.cityId} 
                                              onChange={this.changeEnterpriseInvoiceAddress.bind(this, 'cityId')}>
                                          <option value=""></option>
                                          {this.state.definition.cities.map((city,index) => {
                                              return (
                                                  <option key={`city0_${index}`} value={city.id}>{city.name}</option>
                                              )
                                          })}
                                      </select>
                                      <span>&nbsp;</span>    
                                        <select value={this.state.enterprise.invoiceAddress.zipId} 
                                                onChange={this.changeEnterpriseInvoiceAddress.bind(this, 'zipId')}>
                                            <option value=""></option>
                                            {this.state.definition.cities.find( c => c.id === this.state.enterprise.invoiceAddress.cityId).zips.filter(z => z.id != this.state.enterprise.invoiceAddress.cityId).map((zip,index) => {
                                                return (
                                                    <option key={`zip0_${index}`} value={zip.id}>{zip.name.length > 3 ? zip.name.substring(3) : zip.name}</option>
                                                )
                                            })}
                                        </select>
                                      <span>&nbsp;</span>
                                      <input value={this.state.enterprise.invoiceAddress.address} onChange={this.changeEnterpriseInvoiceAddress.bind(this,'address')}/>
                                  </td>
                                </tr>

                                <tr className="tr-blue">
                                    <th>*客戶開發
                                        <button className="btn-default btn-oliveDrab float-left" 
                                              onClick={this.openChangeContact.bind(this,'CUSTOMER_DEV')}>變更</button>
                                    </th>
                                    <td>
                                       {this.state.enterprise.customerDeveloper.name}
                                    </td>
                                    <th>*照顧經理
                                        <button className="btn-default btn-oliveDrab float-left" 
                                              onClick={this.openChangeContact.bind(this,'CARE_MANAGER')}>變更</button>
                                    </th>
                                    <td>
                                        {this.state.enterprise.careManager.name}
                                    </td>
                                    <td colSpan="2">
                                      <CheckPermission permissions={this.state.permissions}
                                                       permission={mapUrlToPermission["HAPPINESS_ENTERPRISE_CUSTOMER_MANAGMENT"]}
                                                       showForWhichPermission={"HAPPINESS_ENTERPRISE_CUSTOMER_MANAGEMENT_CONTRACT_INFORMATION"}
                                      >
                                        <button className="btn-default btn-orange float-left">合約資料</button>
                                      </CheckPermission>
                                    </td>
                                    <td colSpan="2">
                                      <CheckPermission permissions={this.state.permissions}
                                                       permission={mapUrlToPermission["HAPPINESS_ENTERPRISE_CUSTOMER_MANAGMENT"]}
                                                       showForWhichPermission={"HAPPINESS_ENTERPRISE_CUSTOMER_MANAGEMENT_ACCOUNTING_INFORMATION"}
                                        >
                                        <button className="btn-default btn-pink float-left">帳務資料</button>
                                      </CheckPermission>
                                    </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">
                                      主要聯繫人<br/>
                                      <button className="btn-default btn-oliveDrab float-left" 
                                              onClick={this.openChangeContact.bind(this,'MASTER')}>變更</button>
                                  </th>
                                  <th>*姓名</th>
                                  <td>
                                      {this.state.enterprise.masterContact.familyName}
                                      {this.state.enterprise.masterContact.firstName}
                                    &nbsp;{this.state.enterprise.masterContact.sex === "1" ? '先生': '小姐'}
                                  </td>
                                  <th>*電話</th>
                                  <td>
                                      {this.state.enterprise.masterContact.companyTel}
                                  </td>
                                  <th>*分機</th>
                                  <td>
                                      {this.state.enterprise.masterContact.companyTelExt}
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*員編</th>
                                  <td>
                                      {this.state.enterprise.masterContact.employeeId}
                                  </td>
                                  <th>*行動電話</th>
                                  <td>
                                      {this.state.enterprise.masterContact.cellphone}
                                  </td>
                                  <th>*E-mail</th>
                                  <td>
                                      {this.state.enterprise.masterContact.email}
                                  </td>
                                </tr>

                                <tr className="tr-blue">
                                    <th>&nbsp;</th>
                                    <th>增加</th>
                                    <td colSpan="5">
                                        <select value={this.state.contactType} onChange={this.changeSelectContact.bind(this)}>
                                          <option value=""></option>
                                          <option value="businessContact">業務聯繫人</option>
                                          <option value="financialContact">財務聯繫人</option>
                                        </select>
                                        <a href="javascript:void(0);" onClick={this.addContact}>
                                          <img src="/resource/add.png" alt="新增"/>
                                        </a>
                                    </td>
                                </tr>

                                {this.state.contacts.map((contact,index) => 
                                    this.generateContacts(contact, index)
                                )}
                            </tbody>
                          </table>
                      </tag>
                  </div>
              </div>
          </div>
          <div>
            <button className="btn-default btn-oliveDrab" onClick={this.onUpdateEmployee.bind(this,this.state.enterprise.id)}>確認</button>
          </div>
          <ChangeContact open={this.state.subOpen} 
                         employees={this.state.employees}
                         onRequestClose={this.onCloseChangeContact}
                         onCommit={this.onCommitChangeContact}
                         onCommitContacts={this.onCommitContacts}
                         type={this.state.type}/>
          </Modal.Body>
          </Modal>
      );
    }
}