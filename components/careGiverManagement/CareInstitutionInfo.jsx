import React, { PropTypes } from 'react';
import * as InstitutionActions from 'actions/InstitutionActions';
import * as DefinitionActions from 'actions/DefinitionActions';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import SelectCityZip from 'components/operationsManagement/SelectCityZip' ;
import {Modal, Button, Image} from 'react-bootstrap';
import Document from 'components/common/Document';

export default class CareInstitutionInfo extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
        	definition: props.definition,
            institution : props.institution.institution,
            openSelectCityZipPicker: false
        };
        this.setState({institution : this.toPageModel(this.state.institution)}) ;
    }

    componentWillReceiveProps = newProps => {
        this.setState({
        	definition: newProps.definition,
        	institution : newProps.institution.institution,
        	openSelectCityZipPicker: false
        });
        this.setState({institution : this.toPageModel(this.state.institution)}) ;
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
        	DefinitionActions.getDefinitions()(store.dispatch, store.getState).then(() => {
        		InstitutionActions.getCareInstitution(store.getState().auth.careEmployee.companyId)(store.dispatch, store.getState).then(() =>  callback());
        	});
        }
    }

    changeInstitution(field, e){
        this.state.institution[field] = e.target.value;
        this.setState({institution:this.state.institution});
        //console.log(JSON.stringify(this.state.insurant));
    };

    changeInstitutionCreateDate(field, e, date){
        const dateStr = moment(date).format("YYYY-MM-DD");
        let nextIns = Object.assign({}, this.state.institution);
        nextIns[field] = dateStr;
        this.setState({institution:nextIns});
	};

	toPageModel = (model) => {
        let updateModel = model ;
        updateModel.serviceAreas = updateModel.serviceAreas.map(m => ({
          "id": m.zipId === undefined ?  m.id : m.zipId, 
          "name": m.zipName === undefined ? m.name : m.zipName, 
          "checked": true
        }));
        return updateModel ;
    };

	onSelectCityZipCommit = (model) => {
      this.state.institution.serviceAreas = model ;
      this.setState({institution: this.state.institution}); 
    };
    onCloseSelectCityZip = () => {
      this.setState({openSelectCityZipPicker:false}) ;
    };

    handleUpdate = () => {
    	let model = {
    		"name": this.state.institution.name,
			"tel": this.state.institution.tel,
			"feature": this.state.institution.feature,
			"goodDeed": this.state.institution.goodDeed,
			"serviceAreaIds": this.state.institution.serviceAreas.map(sa => sa.id),
			"logoFileKey": this.state.institution.logoFileKey
    	};
    	this.props.actions.updateInstitution(this.state.institution.id, model);
    };

    handleUploadImage = (fileKey, fileName) => {
        this.state.institution.logoFileKey = fileKey
        this.state.institution.logoFileUrl = fileName
        this.setState({institution: this.state.institution});
        console.log('profile is changing new picture > ' + fileName)
    };

    // 上傳並取得程課圖片後更新的 callback
    handleChangeImage = (field, url) => {
        this.state.institution[field] = url;
        this.setState({institution: this.state.institution});
    };

    handleConfirmUpload = () => {
        this.props.actions.uploadHeadshot({"headFileKey": this.state.institution.logoFileKey}) ;
    };

    render() {
    	return (
    		<div id="portal">
            <div className="listBox">
		 	<div className="box">
		 		<div>
                    <Image src={this.state.institution.logoFileUrl} circle/>
                    <Document
                        auth={this.props.auth}
                        docType="image"
                        convertType="profile-image"
                        onUpload={this.handleUploadImage}
                        onFileUrl={this.handleChangeImage.bind(this, 'logoFileUrl')}
                        displayTag="Web"
                        btnName="上傳照片"
                    />
                    <span className="float-right">&nbsp;&nbsp;</span>
                </div>

		 		<table>
			 		<tbody key={"static_service_1"}>
			 			<tr className="tr-blue">
				 			<th colSpan="7">	
				 				機構簡介
				 			</th>
			 			</tr>
			 			<tr>
			 				<th>機構名稱</th>
			 				<td>
			 					<input value={this.state.institution.name} 
			 						onChange={this.changeInstitution.bind(this,'name')}/>
			 				</td>
			 				<th>成立時間</th>
			 				<td>
			 					<DatePicker value={moment(this.state.institution.institutionCreateDate).format()} 
                                        onChange={this.changeInstitutionCreateDate.bind(this, 'institutionCreateDate')}
                                        dateFormat="YYYY-MM-DD"/>
			 				</td>
			 			</tr>
			 			<tr>
			 				<th>特點</th>
			 				<td>
			 					<input value={this.state.institution.feature}
			 						onChange={this.changeInstitution.bind(this,'feature')}/>
			 				</td>
			 				<th>優良事蹟</th>
			 				<td>
			 					<input value={this.state.institution.goodDeed}
			 						onChange={this.changeInstitution.bind(this,'goodDeed')}/>
			 				</td>
			 			</tr>
			 			<tr>
			 				<th>服務地區</th>
			 				<td>
			 					<textarea value={this.state.institution.serviceAreas.map(sa=> sa.name).join(", ")} onClick={() => this.setState({openSelectCityZipPicker:true})} />
			 				</td>
			 				<th>主要聯繫人</th>
			 				<th>
			 					姓名 &nbsp;
			 					{this.state.institution.masterContact.familyName} {this.state.institution.masterContact.firstName}
			 				</th>
			 			</tr>
			 			<tr>
			 				<th>電話</th>
			 				<th>
			 					{this.state.institution.masterContact.companyTel}
			 				    &nbsp; 分機 {this.state.institution.masterContact.companyTelExt}
			 				</th>
			 				<th>行動電話</th>
			 				<td>{this.state.institution.masterContact.cellphone}</td>
			 			</tr>
			 			<tr>
			 				<th>mail</th>
			 				<td>{this.state.institution.masterContact.email}</td>
			 			</tr>
			 		</tbody>
		 		</table>
		 	</div>
		 	<div>
             	<button className="btn-default btn-oliveDrab" onClick={this.handleUpdate}>更新</button>
            </div>
		 	</div>
		 	<SelectCityZip open={this.state.openSelectCityZipPicker} 
                        cities={this.state.definition.cities}
                        defaultChecked={this.state.institution.serviceAreas} 
                        onConfirm={this.onSelectCityZipCommit}
                        onRequestClose={this.onCloseSelectCityZip}/>
		 	</div>
		);
    }
}