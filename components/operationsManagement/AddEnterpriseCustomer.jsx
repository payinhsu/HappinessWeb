import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Modal, Button, Image} from 'react-bootstrap';

export default class AddEnterpriseCustomer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open : props.open, 
            enterprise:props.enterprise,
            definition: props.definition,
            contactType: "",
            contacts:[],
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            enterprise:newProps.enterprise,
            definition: newProps.definition,
            contacts:[],
            contactType:""
        };
        this.setState(nextState);
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

    changeEnterpriseMasterContact(field, e){
        // console.log(e.target.value) ;
        this.state.enterprise.masterContact[field] = e.target.value;
        this.setState({enterprise:this.state.enterprise});
        // console.log(JSON.stringify(this.state.enterprise));
    };

    changeContact(field, index, e){
        // console.log(e.target.value) ;
        this.state.contacts[index][field] = e.target.value;
        this.setState({contacts:this.state.contacts});
        // console.log(JSON.stringify(this.state.contacts));
    };

    // contact edit
    changeSelectContact = (e) => {
      this.setState({contactType:e.target.value});
    } ;

    handleCommit = () => {
      this.setState({open: false});
      this.state.enterprise.businessContacts = this.state.contacts.filter(ct => ct.type == "businessContact") ;
      this.state.enterprise.financialContacts = this.state.contacts.filter(ct => ct.type == "financialContact") ;
      this.props.toCommit(this.state.enterprise) ;
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    addContact = () =>  {
      if(this.state.contactType == "") {
          // do nothing
      } else {
          let model = {
            "type": this.state.contactType,
            "employeeId":"",
            "sex":"",
            "familyName":"",
            "firstName":"",
            "cellphone":"",
            "email":"",
            "companyTel":"",
            "companyTelExt":""
          } ;
          
          this.state.contacts.push(model) ;
          this.setState({contacts:this.state.contacts});
          // console.log("add " + JSON.stringify(this.state.contacts)) ;
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
                  <a href="javascript:void(0);" onClick={this.delContact.bind(this, index)}>
                    <img src="/resource/del.png" alt="刪除"/>
                  </a>
                </th>
                <th>*姓名</th>
                <td>
                  姓 : <input value={contact.familyName}
                              onChange={this.changeContact.bind(this,'familyName', index)}/>
                  名 : <input value={contact.firstName}
                              onChange={this.changeContact.bind(this,'firstName', index)}/> 
                  <div>
                      <input name={`contactsex_${index}`} type="radio" value="1" 
                           onChange={this.changeContact.bind(this, 'sex', index)}
                           checked={contact.sex === '1'}/>先生
                      <input name={`contactsex_${index}`} type="radio" value="0"
                           onChange={this.changeContact.bind(this, 'sex', index)}
                           checked={contact.sex === '0'}/>小姐
                  </div>
                </td>
                <th>*電話</th>
                <td>
                    <input value={contact.companyTel}
                         onChange={this.changeContact.bind(this,'companyTel', index)}/>
                </td>
                <th>*分機</th>
                <td>
                    <input value={contact.companyTelExt}
                         onChange={this.changeContact.bind(this,'companyTelExt', index)}/>
                </td>
            </tr>,
            <tr className={index%2 == 0 ? "tr-lightblue":"tr-blue"}>
                <th>*員編</th>
                <td>
                    <input value={contact.employeeId}
                         onChange={this.changeContact.bind(this,'employeeId', index)}/>
                </td>
                <th>*行動電話</th>
                <td>
                    <input value={contact.cellphone}
                         onChange={this.changeContact.bind(this,'cellphone', index)}/>
                </td>
                <th>*E-mail</th>
                <td>
                    <input value={contact.email}
                         onChange={this.changeContact.bind(this,'email', index)}/>
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
                <Modal.Title><p>新增企業客戶資料</p></Modal.Title>
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
                                        <input value={this.state.enterprise.name} 
                                              onChange={this.changeEnterprise.bind(this,'name')}/>
                                    </td>
                                    <th>*公司簡稱</th>
                                    <td colSpan="3">
                                        <input value={this.state.enterprise.abbreviation}
                                             onChange={this.changeEnterprise.bind(this,'abbreviation')}/>
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*統編</th>
                                  <td>
                                      <input value={this.state.enterprise.id}
                                           onChange={this.changeEnterprise.bind(this,'id')}/>
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
                                  <td colSpan="2">月結(每個約最後一天)</td>
                                  <th>*交易方式</th>
                                  <td colSpan="3">
                                      <select value={this.state.enterprise.transactionType}
                                              onChange={this.changeEnterprise.bind(this,'transactionType')}>
                                        <option value=""></option>
                                        <option value="1">匯款</option>
                                        <option value="2">支票</option>
                                        <option value="3">刷卡</option>
                                        <option value="4">ATM</option>
                                      </select>
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*對帳日</th>
                                  <td colSpan="2">
                                    每月<input value={this.state.enterprise.reconciliationDate}
                                           onChange={this.changeEnterprise.bind(this,'reconciliationDate')}/>日
                                  </td>
                                  <th>*請款日</th>
                                  <td colSpan="3">
                                    每月<input value={this.state.enterprise.invoiceDate}
                                           onChange={this.changeEnterprise.bind(this,'invoiceDate')}/>日
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*發票類型</th>
                                  <td colSpan="2">
                                      <div>
                                        <input name="invoiceType" type="radio" value="2" 
                                               onChange={this.changeEnterprise.bind(this,'invoiceType')}/>二聯
                                        <input name="invoiceType" type="radio" value="3"
                                               onChange={this.changeEnterprise.bind(this,'invoiceType')}/>三聯
                                      </div> 
                                  </td>
                                  <th>*發票抬頭</th>
                                  <td colSpan="3">
                                    <input value={this.state.enterprise.invoiceTitle}
                                           onChange={this.changeEnterprise.bind(this,'invoiceTitle')}/>
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
                                    <th>*客戶開發</th>
                                    <td>
                                       <select value={this.state.enterprise.customerDeveloperId}
                                                onChange={this.changeEnterprise.bind(this,'customerDeveloperId')}>
                                          <option value=""></option>
                                          {this.state.definition.customerDevelopers.map(cd => (
                                            <option value={cd.id}>{cd.name}</option>
                                          ))}
                                        </select>
                                    </td>
                                    <th>*照顧經理</th>
                                    <td colSpan="4">
                                        <select value={this.state.enterprise.responsibleMemberId}
                                                onChange={this.changeEnterprise.bind(this,'responsibleMemberId')}>
                                          <option value=""></option>
                                          {this.state.definition.careManagers.map(cd => (
                                            <option value={cd.id}>{cd.name}</option>
                                          ))}
                                        </select>
                                    </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">主要聯繫人</th>
                                  <th>*姓名</th>
                                  <td>
                                    姓 : <input value={this.state.enterprise.masterContact.familyName}
                                                onChange={this.changeEnterpriseMasterContact.bind(this,'familyName')}/> 
                                    名 : <input value={this.state.enterprise.masterContact.firstName}
                                                onChange={this.changeEnterpriseMasterContact.bind(this,'firstName')}/> 
                                    <div>
                                      <input name="hrContactsex" type="radio" value="1" 
                                             onChange={this.changeEnterpriseMasterContact.bind(this,'sex')}
                                             checked={this.state.enterprise.masterContact.sex === '1'}/>先生
                                      <input name="hrContactsex" type="radio" value="0"
                                             onChange={this.changeEnterpriseMasterContact.bind(this,'sex')}
                                             checked={this.state.enterprise.masterContact.sex === '0'}/>小姐
                                    </div>
                                  </td>
                                  <th>*電話</th>
                                  <td>
                                      <input value={this.state.enterprise.masterContact.companyTel}
                                           onChange={this.changeEnterpriseMasterContact.bind(this,'companyTel')}/>
                                  </td>
                                  <th>*分機</th>
                                  <td>
                                      <input value={this.state.enterprise.masterContact.companyTelExt}
                                           onChange={this.changeEnterpriseMasterContact.bind(this,'companyTelExt')}/>
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*員編</th>
                                  <td>
                                      <input value={this.state.enterprise.masterContact.employeeId}
                                           onChange={this.changeEnterpriseMasterContact.bind(this,'employeeId')}/>
                                  </td>
                                  <th>*行動電話</th>
                                  <td>
                                      <input value={this.state.enterprise.masterContact.cellphone}
                                           onChange={this.changeEnterpriseMasterContact.bind(this,'cellphone')}/>
                                  </td>
                                  <th>*E-mail</th>
                                  <td>
                                      <input value={this.state.enterprise.masterContact.email}
                                           onChange={this.changeEnterpriseMasterContact.bind(this,'email')}/>
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
            <button className="btn-default btn-oliveDrab" onClick={this.handleCommit}>確認</button>
          </div>
          </Modal.Body>
          </Modal>
      );
    }
}