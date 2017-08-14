import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import SelectCityZip from 'components/operationsManagement/SelectCityZip' ;
import {Modal, Button, Image} from 'react-bootstrap';

export default class AddCareHoursekeeper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            careGiver : props.careGiver,
            isNew: props.isNew, 
            definition: props.definition,
            openSelectCityZipPicker: false
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            careGiver: newProps.careGiver,
            isNew: newProps.isNew,
            definition: newProps.definition,
            openSelectCityZipPicker: false
        };
        this.setState(nextState);
    };

    handleCommit = () => {
      this.setState({open: false});
      this.props.toCommit(this.state.careGiver) ;
    };
    handleUpdate = () => {
      this.setState({open: false});
      this.props.toUpdate(this.state.careGiver.id,this.state.careGiver) ;
    };
    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    changeCareGiver(field, e){
        console.log(e.target.value) ;
        this.state.careGiver[field] = e.target.value;
        this.setState({careGiver:this.state.careGiver});
        console.log(JSON.stringify(this.state.careGiver));
    };

    changeCareGiverFinance(field, e){
        console.log(e.target.value) ;
        this.state.careGiver.finance[field] = e.target.value;
        this.setState({careGiver:this.state.careGiver});
        console.log(JSON.stringify(this.state.careGiver));
    };

    onSelectCityZipCommit = (model) => {
      this.state.careGiver.serviceAreaIds = model ;
      this.setState({careGiver: this.state.careGiver}); 
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
          //     title="新增照顧管家資料"
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
                <Modal.Title><p>新增照顧管家資料</p></Modal.Title>
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
                                      姓 : {this.state.isNew ? <input value={this.state.careGiver.familyName}
                                                  onChange={this.changeCareGiver.bind(this,'familyName')}/>
                                                  : this.state.careGiver.familyName}
                                      名 : {this.state.isNew ? <input value={this.state.careGiver.firstName}
                                                  onChange={this.changeCareGiver.bind(this,'firstName')}/> 
                                                  : this.state.careGiver.firstName}
                                      {this.state.isNew ? 
                                        <div>
                                          <input name="sex" type="radio" value="1" 
                                               onChange={this.changeCareGiver.bind(this,'sex')}
                                               checked={this.state.careGiver.sex === '1'}/>先生
                                          <input name="sex" type="radio" value="0"
                                               onChange={this.changeCareGiver.bind(this,'sex')}
                                               checked={this.state.careGiver.sex === '0'}/>小姐
                                        </div>
                                        : this.state.careGiver.sex === "1" ? '先生': '小姐'
                                      }
                                    </td>
                                    <th>*身份證字號</th>
                                    <td>
                                      {this.state.isNew ?
                                        <input value={this.state.careGiver.idNo}
                                              onChange={this.changeCareGiver.bind(this,'idNo')}/>
                                        : this.state.careGiver.idNo
                                      }
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>*行動電話</th>
                                  <td>
                                    <input value={this.state.careGiver.cellphone}
                                           onChange={this.changeCareGiver.bind(this,'cellphone')}/>
                                  </td>
                                  <th>*E-mail</th>
                                  <td colSpan="2">
                                    {this.state.isNew ? 
                                      <input value={this.state.careGiver.email}
                                             onChange={this.changeCareGiver.bind(this,'email')}/>
                                      : this.state.careGiver.email
                                    }
                                  </td>
                                </tr>
                                <tr className="tr-blue">
                                  <th>室內電話</th>
                                  <td>
                                    <input value={this.state.careGiver.tel}
                                           onChange={this.changeCareGiver.bind(this,'tel')}/>
                                  </td>
                                  <th>服務地區</th>
                                  <td colSpan="2">
                                     <textarea value={this.state.careGiver.serviceAreaIds.map(zip=> zip.name).join(", ")} onClick={() => this.setState({openSelectCityZipPicker:true})} />
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th rowSpan="2">財務資料</th>
                                  <th>*銀行</th>
                                  <td colSpan="2">
                                    <select value={this.state.careGiver.finance.bankCode} 
                                            onChange={this.changeCareGiverFinance.bind(this,'bankCode')}>
                                            <option value=""></option>
                                      {this.state.definition.banks.map(bank => 
                                        <option value={bank.code}>{bank.name}</option>
                                      )}
                                    </select>
                                  </td>
                                  <th>*分行</th>
                                  <td>
                                    <input value={this.state.careGiver.finance.bankBranchName}
                                           onChange={this.changeCareGiverFinance.bind(this,'bankBranchName')}/>
                                  </td>
                                </tr>
                                <tr className="tr-lightblue">
                                  <th>*帳號</th>
                                  <td colSpan="2">
                                    <input value={this.state.careGiver.finance.bankAccount}
                                           onChange={this.changeCareGiverFinance.bind(this,'bankAccount')}/>
                                  </td>
                                  <th>*戶名</th>
                                  <td>
                                    <input value={this.state.careGiver.finance.bankAccountName}
                                           onChange={this.changeCareGiverFinance.bind(this,'bankAccountName')}/>
                                  </td>
                                </tr>

                                <tr className="tr-lightblue">
                                  <th>上傳資料</th>
                                  <th>負責人身分證影本(正反面)</th>
                                  <td colSpan="2">
                                    {this.state.isNew ? 
                                      <input value={this.state.careGiver.finance.ownerIDCardFileKey}
                                           onChange={this.changeCareGiverFinance.bind(this,'ownerIDCardFileKey')}/>
                                      : this.state.careGiver.finance.ownerIDCardFileName
                                    }
                                    <button>上傳</button>
                                  </td>
                                  <th>金融機構存摺影本</th>
                                  <td colSpan="3">
                                    {this.state.isNew ? 
                                      <input value={this.state.careGiver.finance.passbookFileKey}
                                           onChange={this.changeCareGiverFinance.bind(this,'passbookFileKey')}/>
                                      : this.state.careGiver.finance.passbookFileName
                                    }
                                    <button>上傳</button>
                                  </td>
                                </tr>

                                <tr>
                                  <th>業務承辦</th>
                                  <th>*客戶開發</th>
                                  <td>
                                      <select value={this.state.careGiver.responsibleMemberId}
                                              onChange={this.changeCareGiver.bind(this,'responsibleMemberId')}>
                                        <option value=""></option>
                                        {this.state.definition.members.map(cd => (
                                          <option value={cd.id}>{cd.name}</option>
                                        ))}
                                      </select>
                                  </td>
                                  {this.state.isNew ? '':
                                    <td colSpan="2">
                                        <button className="btn-default btn-orange float-left">合約資料</button>
                                    </td>
                                  }
                                  {this.state.isNew ?  '':
                                    <td colSpan="2">
                                        <button className="btn-default btn-pink float-left">帳務資料</button>
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
                        defaultChecked={this.state.careGiver.serviceAreaIds} 
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