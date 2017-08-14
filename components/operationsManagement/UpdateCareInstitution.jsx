import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import ChangeContact from 'components/operationsManagement/ChangeContact' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';
import Document from 'components/common/Document';
import {Modal, Button, Image} from 'react-bootstrap';

export default class AddCareInstitution extends React.Component {

    static contextTypes = {
        authData: React.PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            open : props.open,
            institution: props.institution,
            definition: props.definition,
            employees: props.employees,
            permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : [] ,
            contactType: "",
            contacts: [],
            subOpen: false,
            type:""
        }
        this.setState({contacts: this.toPageModel(this.state.institution.businessContacts)});
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            institution: newProps.institution,
            definition: newProps.definition,
            employees: newProps.employees,
            contactType: "",
            contacts: [],
            subOpen: false,
            type:""
        };
        this.setState(nextState);
        // console.log(JSON.stringify(this.state.institution) ) ;
        this.setState({contacts: this.toPageModel(this.state.institution.businessContacts)});
    };

    toPageModel = (businessContacts) => {
      // console.log(JSON.stringify(businessContacts) ) ;
      return businessContacts.map( bc =>  {
              return {"type": "businessContact",
              "id": bc.id,
              "sex":bc.sex,
              "familyName":bc.familyName,
              "firstName":bc.firstName,
              "cellphone":bc.cellphone,
              "email":bc.email,
              "companyTel":bc.companyTel,
              "companyTelExt":bc.companyTelExt}
            })
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

    // process for change contact 
    openChangeContact = () => {
        this.setState({type:""});
        this.setState({subOpen: true}) ;
    };
    onCloseChangeContact = () => {
        this.setState({subOpen: false}) ;
    };
    onCommitChangeContact = (type, em) => {   // master
        this.setState({subOpen: false}) ;
        // console.log("commit : " + JSON.stringify(em)) ;
        this.state.institution.masterContact = {
              "id": em.id,
              "sex": em.sex,
              "familyName": em.familyName,
              "firstName": em.firstName,
              "cellphone": em.cellphone,
              "email": em.email,
              "companyTel": em.companyTel,
              "companyTelExt": em.companyTelExt
        }
        this.setState({institution: this.state.institution}) ;
    };
    onCommitContacts = (type, em) => {    // business
        this.setState({subOpen: false}) ;
        if(this.state.contacts.find(c => c.id == em.id) === undefined) {
            this.state.contacts.push(
                { "type": type,
                  "id": em.id,
                  "sex":em.sex,
                  "familyName":em.familyName,
                  "firstName":em.firstName,
                  "cellphone":em.cellphone,
                  "email":em.email,
                  "companyTel":em.companyTel,
                  "companyTelExt":em.companyTelExt});
            this.setState({contacts:this.state.contacts});
        } 
    };
    // process for change contact end

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

    onUpdateInstitution(institutionId) {
      let model = {
        "tel": this.state.institution.tel,
        "fax": this.state.institution.fax,
        "owner" : {
          "sex": this.state.institution.owner.sex,
          "familyName": this.state.institution.owner.familyName,
          "firstName": this.state.institution.owner.firstName
        },
        "masterContactId": this.state.institution.masterContact.id, 
        "businessContactIds": this.state.contacts.map(ct => ct.id)
      };
      //console.log("ready to update model : " + JSON.stringify(model)) ;
      this.props.updateInstitution(institutionId, model) ;
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    addContact = () =>  {
      if(this.state.contactType == "") {
        // do nothing
      } else {
        this.setState({type:"businessContact"});
        this.setState({subOpen: true}) ;
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
                <th>*行動電話</th>
                <td>
                    {contact.cellphone}
                </td>
                <th>*E-mail</th>
                <td colSpan="3">
                    {contact.email}
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
                <Modal.Title><p>更新照顧機構資料</p></Modal.Title>
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
                                    <td colSpan="2">{this.state.institution.name}</td>
                                    <th>*公司簡稱</th>
                                    <td colSpan="3">{this.state.institution.abbreviation}</td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*統編</th>
                                  <td>{this.state.institution.id}</td>
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
                                      {this.state.institution.finance.bankName}
                                  </td>
                                  <th>*分行</th>
                                  <td colSpan="3">
                                      {this.state.institution.finance.bankBranchName}
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*帳號</th>
                                  <td colSpan="2"> 
                                      {this.state.institution.finance.bankAccount}
                                  </td>
                                  <th>*戶名</th>
                                  <td colSpan="3">
                                      {this.state.institution.finance.bankAccountName}
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th>上傳資料</th>
                                  <th>負責人身分證影本(正反面)</th>
                                  <td colSpan="2">
                                      {this.state.institution.finance.ownerIDCardFileUrl === undefined ? this.state.institution.finance.ownerIDCardFileName:
                                          <a href = {this.state.institution.finance.ownerIDCardFileUrl} target = "_blank">{this.state.institution.finance.ownerIDCardFileName}</a>}
                                      <Document
                                          auth={this.props.auth}
                                          docType="image"
                                          convertType="operation-image"
                                          onUpload={this.handleUploadOwnerIDCardImage}
                                          onFileUrl={this.handleChangeOwnerIDCardImage.bind(this, 'ownerIDCardFileUrl')}
                                          displayTag="WebThumbnail"
                                          btnName="上傳"
                                      />
                                  </td>
                                  <th>金融機構存摺影本</th>
                                  <td colSpan="3">
                                      {this.state.institution.finance.passbookFileKey}
                                    <button>上傳</button>
                                  </td>
                                </tr>

                                <tr className="tr-blue">
                                  <th>業務承辦</th>
                                  <th>*客戶開發</th>
                                  <td>
                                      {this.state.institution.responsibleMemberId == "" ? '' 
                                        : this.state.definition.members.find( cd => 
                                          cd.id == this.state.institution.responsibleMemberId).name
                                      }
                                  </td>
                                  <td colSpan="2">
                                    <CheckPermission permissions={this.state.permissions}
                                                     permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}
                                                     showForWhichPermission={"HAPPINESS_CARE_INSTITUTION_MANAGMENT_CONTRACT_INFORMATION"}
                                    >
                                      <button className="btn-default btn-orange float-left">合約資料</button>
                                    </CheckPermission>
                                  </td>
                                  <td colSpan="2">
                                    <CheckPermission permissions={this.state.permissions}
                                                     permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}
                                                     showForWhichPermission={"HAPPINESS_CARE_INSTITUTION_MANAGMENT_ACCOUNTING_INFORMATION"}
                                    >
                                      <button className="btn-default btn-pink float-left">帳務資料</button>
                                    </CheckPermission>
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">主要聯繫人<br/>
                                      <button className="btn-default btn-oliveDrab float-left"
                                              onClick={this.openChangeContact}>變更</button>
                                  </th>
                                  <th>*姓名</th>
                                  <td>
                                    姓名 : {this.state.institution.masterContact.familyName}
                                           {this.state.institution.masterContact.firstName}
                                    &nbsp;{this.state.institution.masterContact.sex === "1" ? '先生': '小姐'}
                                  </td>
                                  <th>*電話</th>
                                  <td>
                                      {this.state.institution.masterContact.companyTel}
                                  </td>
                                  <th>*分機</th>
                                  <td>
                                      {this.state.institution.masterContact.companyTelExt}
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*行動電話</th>
                                  <td>
                                      {this.state.institution.masterContact.cellphone}
                                  </td>
                                  <th>*E-mail</th>
                                  <td colSpan="3">
                                      {this.state.institution.masterContact.email}
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
              <button className="btn-default btn-oliveDrab" 
                      onClick={this.onUpdateInstitution.bind(this,this.state.institution.id)}>
                  確認
              </button>
          </div>
          <ChangeContact open={this.state.subOpen} 
                         employees={this.state.employees}
                         onRequestClose={this.onCloseChangeContact}
                         onCommit={this.onCommitChangeContact}
                         onCommitContacts={this.onCommitContacts}
                         type={this.state.type}/>
          </Modal.Body>
          </Modal>
          //</Dialog>
      );
    }
}