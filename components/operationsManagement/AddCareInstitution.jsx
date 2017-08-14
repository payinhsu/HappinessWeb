import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import Document from 'components/common/Document';
import {Modal, Button, Image} from 'react-bootstrap';

export default class AddCareInstitution extends React.Component {
    
    constructor(props,context) {
        super(props,context);
        this.state = {
            open : props.open,
            institution: props.institution,
            definition: props.definition,
            contactType: "",
            contacts: []
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            institution: newProps.institution,
            definition: newProps.definition,
            contactType: "",
            contacts: []
        };
        this.setState(nextState);
    };

    changeInstitution(field, e){
        // console.log(e.target.value) ;
        this.state.institution[field] = e.target.value;
        this.setState({institution:this.state.institution});
        // console.log(JSON.stringify(this.state.institution));
    };

    changeInstitutionOwner(field, e){
        // console.log(e.target.value) ;
        this.state.institution.owner[field] = e.target.value;
        this.setState({institution:this.state.institution});
        // console.log(JSON.stringify(this.state.institution));
    };
         
    changeInstitutionMasterContact(field, e){
        // console.log(e.target.value) ;
        this.state.institution.masterContact[field] = e.target.value;
        this.setState({institution:this.state.institution});
        // console.log(JSON.stringify(this.state.institution));
    };

    changeInstitutionFinance(field, e){
        // console.log(e.target.value) ;
        this.state.institution.finance[field] = e.target.value;
        this.setState({institution:this.state.institution});
        // console.log(JSON.stringify(this.state.institution));
    };

    // ownerIDCard upload
    handleUploadOwnerIDCardImage = (fileKey, fileName) => {
        this.state.institution.finance.ownerIDCardFileKey = fileKey
        this.state.institution.finance.ownerIDCardFileName = fileName
        this.setState({institution: this.state.institution});
    };

    handleChangeOwnerIDCardImage = (field, url) => {
        this.state.institution.finance[field] = url;
        this.setState({institution: this.state.institution});
    }

    delOwnerIDCardFile = () => {
        this.state.institution.finance.ownerIDCardFileKey = undefined
        this.state.institution.finance.ownerIDCardFileName = undefined
        this.state.institution.finance.ownerIDCardFileUrl = undefined
        this.setState({institution: this.state.institution});
    }

    // passbook upload
    handleUploadPassbookImage = (fileKey, fileName) => {
        this.state.institution.finance.passbookFileKey = fileKey
        this.state.institution.finance.passbookFileName = fileName
        this.setState({institution: this.state.institution});
    };

    handleChangePassbookFileImage = (field, url) => {
        this.state.institution.finance[field] = url;
        this.setState({institution: this.state.institution});
    }

    delPassbookFile = () => {
        this.state.institution.finance.passbookFileKey = undefined
        this.state.institution.finance.passbookFileName = undefined
        this.state.institution.finance.passbookFileUrl = undefined
        this.setState({institution: this.state.institution});
    }

    handleCommit = () => {
      this.setState({open: false});
      this.state.institution.businessContacts = this.state.contacts ;
      this.props.toCommit(this.state.institution) ;
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

    // contact edit areas
    changeSelectContact = (e) => {
      this.setState({contactType:e.target.value});
    } ; 
    changeContact(field, index, e){
        // console.log(e.target.value) ;
        this.state.contacts[index][field] = e.target.value;
        this.setState({contacts:this.state.contacts});
        // console.log(JSON.stringify(this.state.contacts));
    };
    // contact areas end



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
                <th>*行動電話</th>
                <td>
                    <input value={contact.cellphone}
                         onChange={this.changeContact.bind(this,'cellphone', index)}/>
                </td>
                <th>*E-mail</th>
                <td colSpan="3">
                    <input value={contact.email}
                         onChange={this.changeContact.bind(this,'email', index)}/>
                </td>
            </tr>
        ]);
    }

    render() {
        // const actions = [
        //   <FlatButton
        //     label="取消"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        //   this.state.isNew ? 
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     onTouchTap={this.handleCommit}
        //   />: ''
        // ];
        return(
          // <Dialog
          //     contentStyle={{width:'90%', maxWidth: 'none'}}
          //     title="新增照顧機構資料"
          //     actions={actions}
          //     modal={false}
          //     open={this.state.open}
          //     onRequestClose={this.handleClose}
          //     autoScrollBodyContent={true}
          // >
          // <Divider />
          <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg"
            dialogClassName="my-modal">
            <Modal.Header closeButton>
                <Modal.Title><p>新增照顧機構資料</p></Modal.Title>
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
                                        <input value={this.state.institution.name} 
                                              onChange={this.changeInstitution.bind(this,'name')}/>
                                    </td>
                                    <th>*公司簡稱</th>
                                    <td colSpan="3">
                                        <input value={this.state.institution.abbreviation}
                                             onChange={this.changeInstitution.bind(this,'abbreviation')}/>
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*統編</th>
                                  <td>
                                      <input value={this.state.institution.id}
                                           onChange={this.changeInstitution.bind(this,'id')}/>
                                  </td>
                                  <th>*負責人</th>
                                  <td colSpan="4">
                                    姓 : <input value={this.state.institution.owner.familyName}
                                                onChange={this.changeInstitutionOwner.bind(this,'familyName')}/> 
                                    名 : <input value={this.state.institution.owner.firstName}
                                                onChange={this.changeInstitutionOwner.bind(this,'firstName')}/>
                                    <input name="ownersex" type="radio" value="1" 
                                           onChange={this.changeInstitutionOwner.bind(this,'sex')}
                                           checked={this.state.institution.owner.sex === '1'}/>先生
                                    <input name="ownersex" type="radio" value="0"
                                           onChange={this.changeInstitutionOwner.bind(this,'sex')}
                                           checked={this.state.institution.owner.sex === '0'}/>小姐
                                  </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*電話</th>
                                  <td>
                                    <input value={this.state.institution.tel}
                                           onChange={this.changeInstitution.bind(this,'tel')}/>
                                  </td>
                                  <th>傳真</th>
                                  <td colSpan='3'>
                                    <input value={this.state.institution.fax}
                                           onChange={this.changeInstitution.bind(this,'fax')}/>
                                  </td>
                                </tr>
                                
                                <tr className="tr-lightblue">
                                  <th rowSpan="2">財務資料</th>
                                  <th>*銀行</th>
                                  <td colSpan="2">
                                      <select value={this.state.institution.finance.bankCode}
                                              onChange={this.changeInstitutionFinance.bind(this, 'bankCode')}>
                                        <option value=""></option>
                                        {this.state.definition.banks.map( (bank,index) => (
                                          <option value={bank.code}>{bank.name}</option>
                                        ))}
                                      </select>
                                  </td>
                                  <th>*分行</th>
                                  <td colSpan="3">
                                      <input value={this.state.institution.finance.bankBranchName}
                                           onChange={this.changeInstitutionFinance.bind(this,'bankBranchName')}/>
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*帳號</th>
                                  <td colSpan="2"> 
                                      <input value={this.state.institution.finance.bankAccount}
                                           onChange={this.changeInstitutionFinance.bind(this,'bankAccount')}/>
                                  </td>
                                  <th>*戶名</th>
                                  <td colSpan="3">

                                      <input value={this.state.institution.finance.bankAccountName}
                                           onChange={this.changeInstitutionFinance.bind(this,'bankAccountName')}/>
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th>上傳資料</th>
                                  <th>負責人身分證影本(正反面)</th>
                                  <td colSpan="2">
                                      {this.state.institution.finance.ownerIDCardFileUrl === undefined ? this.state.institution.finance.ownerIDCardFileName :
                                          <div>
                                              <a href={this.state.institution.finance.ownerIDCardFileUrl}
                                                 target="_blank">{this.state.institution.finance.ownerIDCardFileName}</a>
                                              <a href="javascript:void(0);" onClick={this.delOwnerIDCardFile}>
                                                    <img src="/resource/del.png" alt="刪除"/>
                                              </a>
                                          </div>
                                      }
                                      <Document
                                          auth={this.props.auth}
                                          docType="image"
                                          convertType="operation-image"
                                          onUpload={this.handleUploadOwnerIDCardImage}
                                          onFileUrl={this.handleChangeOwnerIDCardImage.bind(this, 'ownerIDCardFileUrl')}
                                          displayTag="Web"
                                          btnName="上傳"
                                      />
                                  </td>
                                  <th>金融機構存摺影本</th>
                                  <td colSpan="3">
                                      {this.state.institution.finance.passbookFileUrl === undefined ? this.state.institution.finance.passbookFileName :
                                          <div>
                                              <a href={this.state.institution.finance.passbookFileUrl}
                                                 target="_blank">{this.state.institution.finance.passbookFileName}</a>
                                              <a href="javascript:void(0);" onClick={this.delPassbookFile}>
                                                  <img src="/resource/del.png" alt="刪除"/>
                                              </a>
                                          </div>
                                      }
                                      <Document
                                          auth={this.props.auth}
                                          docType="image"
                                          convertType="operation-image"
                                          onUpload={this.handleUploadPassbookImage}
                                          onFileUrl={this.handleChangePassbookFileImage.bind(this, 'passbookFileUrl')}
                                          displayTag="Web"
                                          btnName="上傳"
                                      />

                                      <input value={this.state.institution.finance.passbookFileKey}
                                           onChange={this.changeInstitutionFinance.bind(this,'passbookFileKey')}/>
                                    <button>上傳</button>
                                  </td>
                                </tr>

                                <tr className="tr-blue">
                                  <th>業務承辦</th>
                                  <th>*客戶開發</th>
                                  <td colSpan="5">
                                      <select value={this.state.institution.responsibleMemberId}
                                              onChange={this.changeInstitution.bind(this,'responsibleMemberId')}>
                                        <option value=""></option>
                                        {this.state.definition.members.map(cd => (
                                          <option value={cd.id}>{cd.name}</option>
                                        ))}
                                      </select>
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">主要聯繫人</th>
                                  <th>*姓名</th>
                                  <td>
                                    姓 : <input value={this.state.institution.masterContact.familyName}
                                                onChange={this.changeInstitutionMasterContact.bind(this,'familyName')}/>
                                    名 : <input value={this.state.institution.masterContact.firstName}
                                                onChange={this.changeInstitutionMasterContact.bind(this,'firstName')}/> 
                                      <div>
                                        <input name="masterContactsex" type="radio" value="1" 
                                             onChange={this.changeInstitutionMasterContact.bind(this,'sex')}
                                             checked={this.state.institution.masterContact.sex === '1'}/>先生
                                        <input name="masterContactsex" type="radio" value="0"
                                             onChange={this.changeInstitutionMasterContact.bind(this,'sex')}
                                             checked={this.state.institution.masterContact.sex === '0'}/>小姐
                                      </div>
                                  </td>
                                  <th>*電話</th>
                                  <td>
                                      <input value={this.state.institution.masterContact.companyTel}
                                           onChange={this.changeInstitutionMasterContact.bind(this,'companyTel')}/>
                                  </td>
                                  <th>*分機</th>
                                  <td>
                                      <input value={this.state.institution.masterContact.companyTelExt}
                                           onChange={this.changeInstitutionMasterContact.bind(this,'companyTelExt')}/>
                                  </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*行動電話</th>
                                  <td>
                                      <input value={this.state.institution.masterContact.cellphone}
                                           onChange={this.changeInstitutionMasterContact.bind(this,'cellphone')}/>
                                  </td>
                                  <th>*E-mail</th>
                                  <td colSpan="3">
                                      <input value={this.state.institution.masterContact.email}
                                           onChange={this.changeInstitutionMasterContact.bind(this,'email')}/>
                                  </td>
                                </tr>

                                <tr className="tr-blue">
                                    <th>&nbsp;</th>
                                    <th>增加</th>
                                    <td colSpan="5">
                                        <select value={this.state.contactType} onChange={this.changeSelectContact.bind(this)}>
                                          <option value=""></option>
                                          <option value="businessContact">業務聯繫人</option>
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
          //</Dialog>
      );
    }
}