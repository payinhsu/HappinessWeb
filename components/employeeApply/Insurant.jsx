import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import * as DefinitionActions from 'actions/DefinitionActions';
import * as PageActions from 'actions/PageActions';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import {Modal, Button, Image} from 'react-bootstrap';
var config = require('config');

export default class Insurant extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            definition : props.definition,
            auth: props.auth,
            insurant: props.insurant,
            isNew: props.isNew, 
            terminateInsurant: {
                "insurantId": "",
                "terminateReason": ""
            }
        };
        // console.log(JSON.stringify(this.state.insurant)) ;
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open: newProps.open,
            definition : newProps.definition,
            insurant: newProps.insurant, 
            isNew: newProps.isNew, 
            terminateInsurant: {
                "insurantId": "",
                "terminateReason": ""
            } 
        };
        this.setState(nextState);
    };

    // terminateInsurant start
    changeTerminateInsurant(field, e){
        //console.log(e.target.value) ;
        this.state.terminateInsurant[field] = e.target.value;
        this.setState({terminateInsurant:this.state.terminateInsurant});
        //console.log(JSON.stringify(this.state.terminateInsurant));
    };

    toCommitStopPInsureOk = () => {
        let model = this.state.terminateInsurant;
        model.insurantId = this.state.insurant.id;
        this.props.terminateInsurant(this.state.auth.id, model);
        // browserHistory.push('/admin/commitStopPInsureOk');
    };

    // terminateInsurant end

    changeInsurant(field, e){
        //console.log(e.target.value) ;
        this.state.insurant[field] = e.target.value;
        this.setState({insurant:this.state.insurant});
        //console.log(JSON.stringify(this.state.insurant));
    };

    changeInsurantAddr(field, e){
        //console.log(e.target.value) ;
        this.state.insurant.address[field] = e.target.value;
        if(field == "cityId") {
            this.state.insurant.address.cityName = this.state.definition.cities.find(c => c.id === e.target.value).name ;
        }
        if(field == "zipId") {
            this.state.insurant.address.zipName = this.state.definition.cities.find(c => c.id === this.state.insurant.address.cityId).zips.find(z => z.id === e.target.value).name ;
        }
        this.setState({insurant:this.state.insurant});
        // console.log(JSON.stringify(this.state.insurant));
    };

    commitInsurant = () => {
        let model = this.state.insurant;
        model.name = model.familyName + model.firstName ;
        //console.log(model.birthDate) ;
        model.birthDate = moment(model.birthDate, "YYYY-MM-DD").valueOf() ;
        model.height = parseInt(model.height) ;
        model.weight = parseFloat(model.weight) ;
        model.diseases = model.diseaseIds ; 
        //console.log(JSON.stringify(model)) ;

        this.props.onCommitInsurant(model, this.state.isNew) ;
        this.handleClose();
    } ;

    handleChangeBirthday = (field, e, date) => {
        //console.log(date) ;
        const dateStr = moment(date).format("YYYY-MM-DD");
        let nextIns = Object.assign({}, this.state.insurant);
        nextIns[field] = dateStr;
        this.setState({insurant:nextIns});
    }

    handleDisCheck = (itemValue, e) => {
        // console.log(`${itemValue} checked: ${e.target.checked}`);
        let checkList = this.state.insurant.diseaseIds;
        const checked = e.target.checked;
        if(checked)
            checkList.push(itemValue);
        else
            checkList.splice(checkList.indexOf(itemValue), 1);

        this.setState({insurant: this.state.insurant});
        // console.log(JSON.stringify(this.state.insurant.diseaseIds));
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    generateTerminateButton = () => {
        // console.log(!this.state.insurant.isMain && this.state.insurant.familyName !== '') ;
        return(
          (!this.state.insurant.isMain && !this.state.isNew) ? 
            <tr key="terminateb">
                <td>保障終止</td>
                <td colSpan="2"><input value={this.state.terminateInsurant.terminateReason} onChange={this.changeTerminateInsurant.bind(this, 'terminateReason')}/></td>
                <td colSpan="5"><button className="btn-green" onClick={this.toCommitStopPInsureOk.bind(this)}>自費終止</button></td>
            </tr> :<tr></tr>);
    }; 

	render() {
        // const actions = [
        //   <FlatButton
        //     label="取消"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     keyboardFocused={true}
        //     onTouchTap={this.commitInsurant}
        //   />,
        // ];
		return (
        //     <Dialog
        //       contentStyle={{width:'90%', maxWidth: 'none'}}
        //       title={this.state.insurant.isMain ? "新增轉換保障對象資料" : "自增轉換保障對象資料" }
        //       actions={actions}
        //       modal={false}
        //       open={this.state.open}
        //       onRequestClose={this.handleClose}
        //       autoScrollBodyContent={true}
        //     >
		 	    // <Divider />
            <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>{this.state.insurant.isMain ? "新增轉換保障對象資料" : "自增轉換保障對象資料" }</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="listBox">
                    <div className="box">
                        <table>
                            <tbody>
                            <tr><td colSpan="8">&nbsp;</td></tr>
                        	<tr>
                            	<td>* 姓 : </td>
                                <td>
                                    {this.state.isNew ? 
                                    <input value={this.state.insurant.familyName} 
                                        onChange={this.changeInsurant.bind(this, 'familyName')}/>
                                    : this.state.insurant.familyName}
                                </td>
                            	<td>* 名 : </td>
                                <td>
                                    {this.state.isNew ? 
                                    <input value={this.state.insurant.firstName} 
                                        onChange={this.changeInsurant.bind(this, 'firstName')}/>
                                    : this.state.insurant.firstName}
                                </td>
                                <td>* 關係 : </td>
                                <td>
                                    {this.state.isNew ? 
                                    <select value={this.state.insurant.relationshipId} onChange={this.changeInsurant.bind(this, 'relationshipId')}>
                                        <option value=""></option>
                                        {this.state.definition.insurantRelationships.map((relat, index) => {
                                            return (
                                                <option key={`relat_${index}`} value={relat.id}>{relat.name}</option>
                                            )
                                        })}
                                    </select>
                                    : this.state.insurant.relationshipName}
                                </td>
                                <td>* 出生年月日(西元) : </td>
                                <td>
                                    {this.state.isNew ? 
                                    <DatePicker value={moment(this.state.insurant.birthDate).format()} 
                                        onChange={this.handleChangeBirthday.bind(this, 'birthDate')}
                                        dateFormat="YYYY-MM-DD"/>
                                    : moment(this.state.insurant.birthDate).format("YYYY-MM-DD")}
                                </td>
                        	</tr>
                        	<tr>
                                <td colSpan="8">同員工通訊地址 &nbsp;&nbsp; 同員工戶籍地址</td>
                            </tr>
                            <tr>
                                <td colSpan="6">
                                    居住地址 : 
                                    <span>&nbsp;</span>
                                    <select value={this.state.insurant.address.cityId} onChange={this.changeInsurantAddr.bind(this, 'cityId')}>
                                        <option value=""></option>
                                        {this.state.definition.cities.map((city,index) => {
                                            return (
                                                <option key={`city0_${index}`} value={city.id}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                                    <span>&nbsp;</span>       
                                    <select value={this.state.insurant.address.zipId} onChange={this.changeInsurantAddr.bind(this, 'zipId')}>
                                        <option value=""></option>
                                        {this.state.definition.cities.find( c => c.id === this.state.insurant.address.cityId).zips.filter(z => z.id != this.state.insurant.address.cityId).map((zip,index) => {
                                            return (
                                                <option key={`zip0_${index}`} value={zip.id}>{zip.name.length > 3 ? zip.name.substring(3) : zip.name}</option>
                                            )
                                        })}
                                    </select>
                                    <span>&nbsp;</span>
                                    <input value={this.state.insurant.address.address} onChange={this.changeInsurantAddr.bind(this,'address')}/>
                                </td>
                                <td>身高<input type="number" value={this.state.insurant.height} onChange={this.changeInsurant.bind(this, 'height')}/></td>
                                <td>體重<input type="number" value={this.state.insurant.weight} onChange={this.changeInsurant.bind(this, 'weight')}/></td>
                            </tr>
                            <tr>
                                <td colSpan="8">
                                    <div style={{float:'left', width:'33%'}}>
                                        目前現有慢性疾病(可複選)
                                    </div>
                                    <div style={{float:'left', width:'67%'}}>
                                        {this.state.definition.diseases.map((dis, index) => {
                                            return (
                                                <div key={`dis_${index}`}>
                                                    <input type="checkbox" value="" id={`disability_1`}
                                                       name={dis.id}
                                                       defaultChecked={this.state.insurant.diseaseIds.indexOf(dis.id) >= 0}
                                                       onChange={this.handleDisCheck.bind(this, dis.id)}/>
                                                    <span>{dis.name}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </td>
                            </tr>
                            {this.generateTerminateButton()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button onClick={this.commitInsurant}>確認</button>
                </div>
            </Modal.Body>
            </Modal>
            // </Dialog>
		 );
	}
}