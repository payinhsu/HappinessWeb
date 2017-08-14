import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import SelectCityZip from 'components/operationsManagement/SelectCityZip' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';
import {Modal, Button, Image} from 'react-bootstrap';

export default class AddCareManager extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            open : props.open,
            isNew: props.isNew,
            definition: props.definition,
            careManager: props.careManager,
            openSelectCityZipPicker: false,
            permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : []
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            isNew: newProps.isNew,
            definition: newProps.definition,
            careManager: newProps.careManager,
            openSelectCityZipPicker: false
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };
    handleCommit = () => {
      this.setState({open: false});
      this.props.toCommit(this.state.careManager) ;
    };
    handleUpdate = () => {
      this.setState({open: false});
      this.props.toUpdate(this.state.careManager.id,this.state.careManager) ;
    };
    changeCareManager(field, e){
        console.log(e.target.value) ;
        this.state.careManager[field] = e.target.value;
        this.setState({careManager:this.state.careManager});
        console.log(JSON.stringify(this.state.careManager));
    };

    changeCareManagerFinance(field, e){
        console.log(e.target.value) ;
        this.state.careManager.finance[field] = e.target.value;
        this.setState({careManager:this.state.careManager});
        console.log(JSON.stringify(this.state.careManager));
    };
    onSelectCityZipCommit = (model) => {
      this.state.careManager.serviceAreaIds = model ;
      this.setState({careManager: this.state.careManager}); 
    };
    onCloseSelectCityZip = () => {
      this.setState({openSelectCityZipPicker:false}) ;
    };
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
        //   />: '',
        //   this.state.isNew ? '' : 
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     onTouchTap={this.handleUpdate}
        //   />
        // ];
        return(
          // <Dialog
          //     contentStyle={{width:'90%', maxWidth: 'none'}}
          //     title="新增照顧經理資料"
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
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>新增照顧經理資料</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <div id="portal">
              <div className="listBox">
                  <div className="box">
                      <tag>
                          <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th rowSpan="3">&nbsp;</th>
                                    <th>*姓名</th>
                                    <td colSpan="2">
                                      姓 : {this.state.isNew ? <input value={this.state.careManager.familyName}
                                                  onChange={this.changeCareManager.bind(this,'familyName')}/>
                                                  : this.state.careManager.familyName}
                                      名 : {this.state.isNew ? <input value={this.state.careManager.firstName}
                                                  onChange={this.changeCareManager.bind(this,'firstName')}/> 
                                                  : this.state.careManager.firstName}
                                      {this.state.isNew ? 
                                        <div>
                                          <input name="sex" type="radio" value="1" 
                                               onChange={this.changeCareManager.bind(this,'sex')}
                                               checked={this.state.careManager.sex === '1'}/>先生
                                          <input name="sex" type="radio" value="0"
                                               onChange={this.changeCareManager.bind(this,'sex')}
                                               checked={this.state.careManager.sex === '0'}/>小姐
                                        </div>
                                        : this.state.careManager.sex === "1" ? '先生': '小姐'
                                      }
                                    </td>
                                    <th>*身份證字號</th>
                                    <td>
                                      {this.state.isNew ?
                                        <input value={this.state.careManager.idNo}
                                              onChange={this.changeCareManager.bind(this,'idNo')}/>
                                        : this.state.careManager.idNo
                                      }
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*行動電話</th>
                                  <td>
                                    <input value={this.state.careManager.cellphone}
                                           onChange={this.changeCareManager.bind(this,'cellphone')}/>
                                  </td>
                                  <th>*E-mail</th>
                                  <td colSpan="2">
                                    {this.state.isNew ? 
                                      <input value={this.state.careManager.email}
                                             onChange={this.changeCareManager.bind(this,'email')}/>
                                      : this.state.careManager.email
                                    }
                                  </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>室內電話</th>
                                  <td>
                                    <input value={this.state.careManager.tel}
                                           onChange={this.changeCareManager.bind(this,'tel')}/>
                                  </td>
                                  <th>服務地區</th>
                                  <td colSpan="2">
                                     <textarea value={this.state.careManager.serviceAreaIds.map(zip=> zip.name).join(", ")} onClick={() => this.setState({openSelectCityZipPicker:true})} />
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">財務資料</th>
                                  <th>*銀行</th>
                                  <td colSpan="2">

                                      <select value={this.state.careManager.finance.bankCode}
                                              onChange={this.changeCareManagerFinance.bind(this, 'bankCode')}>
                                        <option value=""></option>
                                        {this.state.definition.banks.map( (bank,index) => (
                                          <option value={bank.code}>{bank.name}</option>
                                        ))}
                                      </select>

                                  </td>
                                  <th>*分行</th>
                                  <td>
                                      <input value={this.state.careManager.finance.bankBranchName}
                                           onChange={this.changeCareManagerFinance.bind(this,'bankBranchName')}/>
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*帳號</th>
                                  <td colSpan="2">
                                      <input value={this.state.careManager.finance.bankAccount}
                                           onChange={this.changeCareManagerFinance.bind(this,'bankAccount')}/>
                                  </td>
                                  <th>*戶名</th>
                                  <td>
                                      <input value={this.state.careManager.finance.bankAccountName}
                                           onChange={this.changeCareManagerFinance.bind(this,'bankAccountName')}/>
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th>上傳資料</th>
                                  <th>負責人身分證影本(正反面)</th>
                                  <td colSpan="2">
                                    {this.state.isNew ? 
                                      <input value={this.state.careManager.finance.ownerIDCardFileKey}
                                           onChange={this.changeCareManagerFinance.bind(this,'ownerIDCardFileKey')}/>
                                      : this.state.careManager.finance.ownerIDCardFileName
                                    }

                                    <button>上傳</button>
                                  </td>
                                  <th>金融機構存摺影本</th>
                                  <td colSpan="3">
                                    {this.state.isNew ? 
                                      <input value={this.state.careManager.finance.passbookFileKey}
                                           onChange={this.changeCareManagerFinance.bind(this,'passbookFileKey')}/>
                                      : this.state.careManager.finance.passbookFileName
                                    }
                                    <button>上傳</button>
                                  </td>
                                </tr>

                                <tr>
                                  <th>業務承辦</th>
                                  <th>*客戶開發</th>
                                  <td>
                                    
                                      <select value={this.state.careManager.responsibleMemberId}
                                              onChange={this.changeCareManager.bind(this,'responsibleMemberId')}>
                                        <option value=""></option>
                                        {this.state.definition.members.map(cd => (
                                          <option value={cd.id}>{cd.name}</option>
                                        ))}
                                      </select>
                                    
                                  </td>
                                  {this.state.isNew ? '':
                                    <td colSpan="2">
                                      <CheckPermission permissions={this.state.permissions}
                                                       permission={mapUrlToPermission["HAPPINESS_CARE_MANAGER_MANAGMENT"]}
                                                       showForWhichPermission={"HAPPINESS_CARE_MANAGER_MANAGMENT_CONTRACT_INFORMATION"}
                                      >
                                        <button className="btn-default btn-orange float-left">合約資料</button>
                                      </CheckPermission>
                                    </td>
                                  }
                                  {this.state.isNew ?  '':
                                    <td colSpan="2">
                                      <CheckPermission permissions={this.state.permissions}
                                                       permission={mapUrlToPermission["HAPPINESS_CARE_MANAGER_MANAGMENT"]}
                                                       showForWhichPermission={"HAPPINESS_CARE_MANAGER_MANAGMENT_ACCOUNTING_INFORMATION"}
                                      >
                                        <button className="btn-default btn-pink float-left">帳務資料</button>
                                      </CheckPermission>
                                    </td>
                                  }
                                </tr>
                            </tbody>
                          </table>
                      </tag>
                  </div>
              </div>
          </div>
          <SelectCityZip open={this.state.openSelectCityZipPicker} 
                        cities={this.state.definition.cities}
                        defaultChecked={this.state.careManager.serviceAreaIds} 
                        onConfirm={this.onSelectCityZipCommit}
                        onRequestClose={this.onCloseSelectCityZip}/>
          {this.state.isNew ?
                <div>
                  <button className="btn-default btn-oliveDrab" onClick={this.handleCommit}>確認</button>
                </div>
                :
                <div>
                  <button className="btn-default btn-oliveDrab" onClick={this.handleUpdate}>更新</button>
                </div>
              }
          </Modal.Body>
          </Modal>
          //</Dialog>
      );
    }
}