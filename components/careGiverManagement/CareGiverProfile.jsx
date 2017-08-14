import React, { PropTypes } from 'react';
import * as InstitutionActions from 'actions/InstitutionActions';
import * as DefinitionActions from 'actions/DefinitionActions';
import SelectCityZip from 'components/operationsManagement/SelectCityZip';
import SelectSkills from 'components/common/SelectSkills';
import SelectAbilities from 'components/common/SelectAbilities';
import {Image} from 'react-bootstrap';
import Document from 'components/common/Document';


export default class CareGiverProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            careGivers : props.institution.givers,
            definition: props.definition,
            // giver: {
                name: props.auth.profile.name,	//姓名
                cellphone: props.auth.profile.cellphone,	//行動電話
                tel: props.auth.profile.tel, //室內電話
                serviceAreaIds: [],	//服務地區 ID 清單
                serviceYears: props.auth.careGiver.serviceYears,	//服務年資
                serviceHours: props.auth.careGiver.serviceHours,	//服務時數
                skillIds: [],	//證照清單
                abilityIds: [],  //專長清單
                headFileKey: props.auth.careGiver.headFileKey || '',    //照顧管家專用大頭照
                headFileUrl: props.auth.careGiver.headPhoto,
                // responsibleMemberId: props.definition.careGiver.responsibleMemberId,    //承辦人 memberId
                // finance: props.definition.careGiver.finance
            // },
            serviceAreas : props.auth.careGiver.serviceAreas.map(zip => {
                return({
                    'id': zip.zipId,
                    'name': zip.zipName,
                    'checked': true
                })
            }) || [],
            skills: props.auth.skills.map(skill => {
                return({
                    'id' : skill.id,
                    'name' : skill.name,
                    'checked': true
                })
            }) || [],
            abilities: props.auth.abilities.map(ability => {
                return({
                    'id' : ability.id,
                    'name' : ability.name,
                    'checked': true
                })
            }),
            openSelectCityZipPicker: false,
            openSelectSkillPicker: false,
            openSelectAbilityPicker: false
        };
    }

    changeGiverData = (field, e) => {
        if(field === 'serviceYears'){
            if(e.target.value.length == 0){
                this.state.serviceYears = this.state.serviceYears;
            }else{
                this.state.serviceYears = parseInt(e.target.value);
                this.setState({serviceYears:this.state.serviceYears});
            }
        }else if(field === 'serviceHours'){
            if(e.target.value.length == 0){
                this.state.serviceHours = this.state.serviceHours;
            }else{
                this.state.serviceHours = parseInt(e.target.value);
                this.setState({serviceHours:this.state.serviceHours});
            }
        }else if(field === 'tel'){
            if(e.target.value.length == 0){
                this.state.tel = this.state.tel;
            }else{
                this.state.tel = e.target.value;
                this.setState({tel:this.state.tel});
            }
        }else if(field === 'cellphone'){
            if(e.target.value.length == 0){
                this.state.cellphone = this.state.cellphone;
            }else{
                this.state.cellphone = e.target.value;
                this.setState({cellphone:this.state.cellphone});
            }
        }
    };

    handleCommit = () => {
        let errorCheckCount = 0;
        let needToCheckKey = ["serviceYears", "serviceHours", "tel", "cellphone"];

        needToCheckKey.forEach((check) => {
            if(check === ''){
                errorCheckCount++;
            }
        })
        if(errorCheckCount > 0){
            alert("欄位不得有空值");
        }else {
            if(this.props.auth.careGiver.type === 'INSTITUTION'){
                let giver = this.toApiModel('INSTITUTION');
                this.props.actions.updateInstitutionCareGiver(this.props.auth.careGiver.companyId, this.props.auth.id, giver);
            }else{
                let giver = this.toApiModel('PERSONAL');
                this.props.actions.updatePersonalCareGiver(this.props.auth.id, giver);
            }
        }
    };

    onSelectCityZipCommit = (model) => {
        this.setState({serviceAreas:model});
        this.state.serviceAreaIds = model.map(zip => zip.id) ;
        this.setState({serviceAreaIds: this.state.serviceAreaIds});
    };

    onCloseSelectCityZip = () => {
        this.setState({openSelectCityZipPicker:false}) ;
    };

    onSelectSkillCommit = (model) => {
        this.setState({skills: model});
        this.state.skillIds = model.map(skill => skill.id);
        this.setState({skillIds: this.state.skillIds});
    }

    onCloseSelectSkill = () => {
        this.setState({openSelectSkillPicker:false}) ;
    };

    onSelectAbilityCommit = (model) => {
        this.setState({abilities: model});
        this.state.abilityIds = model.map(ability => ability.id)
        this.setState({abilityIds: this.state.abilityIds});
    }

    onCloseSelectAbility = () => {
        this.setState({openSelectAbilityPicker:false}) ;
    };


    toApiModel = (type) => {
        if(type === 'INSTITUTION'){
            return {
                cellphone: this.state.cellphone,	//行動電話
                tel: this.state.tel, //室內電話
                serviceYears: this.state.serviceYears,	//服務年資
                serviceHours: this.state.serviceHours,	//服務時數
                serviceAreaIds: this.state.serviceAreaIds,
                skillIds: this.state.skillIds, //證照清單
                abilityIds: this.state.abilityIds,  //專長清單
                headFileKey: this.state.headFileKey //照顧管家專用大頭照
            };
        }else{
            return {
                cellphone: this.state.cellphone,	//行動電話
                tel: this.state.tel, //室內電話
                serviceYears: this.state.serviceYears,	//服務年資
                serviceHours: this.state.serviceHours,	//服務時數
                serviceAreaIds: this.state.serviceAreaIds,
                skillIds: this.state.skillIds, //證照清單
                abilityIds: this.state.abilityIds,  //專長清單
                headFileKey: this.state.headFileKey, //照顧管家專用大頭照
                responsibleMemberId: this.props.definition.careGiver.responsibleMemberId,    //承辦人 memberId
                finance: this.props.definition.careGiver.finance
            };
        }

    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                if(store.getState().auth.careGiver.type === 'PERSONAL') {
                    DefinitionActions.getCareGiver(store.getState().auth.id)(store.dispatch, store.getState).then(() => callback());
                }else callback();
            });
        }
    }

    handleUploadImage = (fileKey, fileName) => {
        this.state.headFileKey = fileKey;
        this.state.headFileUrl = fileName;
        this.setState({headFileKey: this.state.headFileKey, headFileUrl: this.state.headFileUrl});
        console.log('profile is changing new picture > ' + fileName);
    };

    // 上傳並取得程課圖片後更新的 callback
    handleChangeImage = (field, url) => {
        this.state.headFileUrl = url;
        this.setState({headFileUrl: this.state.headFileUrl});
    };

    handleConfirmUpload = () => {
        this.props.actions.uploadHeadshot({"headFileKey": this.state.headFileKey}) ;
    };

    render() {
        return (
            <div id="portal">
                <div className="listBox">
                    <div className="serviceTTL">申請服務-照顧管家個人資料</div>
                    <div className="box">
                        <div>
                            <Image src={this.state.headFileUrl} circle/>
                            <Document
                                auth={this.props.auth}
                                docType="image"
                                convertType="profile-image"
                                onUpload={this.handleUploadImage}
                                onFileUrl={this.handleChangeImage.bind(this, 'headFileUrl')}
                                displayTag="Web"
                                btnName="上傳照片"
                            />
                            <span className="float-right">&nbsp;&nbsp;</span>
                        </div>
                        <tag>
                            <table>
                                <thead><tr><th>照顧管家簡介</th></tr></thead>
                                <tbody>
                                <tr>
                                    <th>姓名</th>
                                    <td>{this.state.name}</td>
                                    <th>服務年資</th>
                                    <td><input type="number" value= {this.state.serviceYears} onChange={this.changeGiverData.bind(this, 'serviceYears')}/></td>
                                    <th>服務時數</th>
                                    <td><input type="number" value= {this.state.serviceHours} onChange={this.changeGiverData.bind(this, 'serviceHours')}/></td>
                                </tr>
                                <tr>
                                    <th>
                                        專業證照
                                    </th>
                                    <td>
                                        <textarea
                                            value={this.state.skills.map(skill=> skill.name).join(", ")}
                                            onClick={() => this.setState({openSelectSkillPicker: true})}/>
                                    </td>
                                    <th>
                                        專長
                                    </th>
                                    <td>
                                        <textarea value={this.state.abilities.map(ability=> ability.name).join(", ")}
                                                  onClick={() => this.setState({openSelectAbilityPicker: true})}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>服務地區</th>
                                    <td>
                                        <textarea
                                            value={this.state.serviceAreas.map(zip => zip.zipName || zip.name).join(", ")}
                                            onClick={() => this.setState({openSelectCityZipPicker: true})}/>
                                    </td>
                                    <th>聯繫電話</th>
                                    <td><input value={this.state.tel} onChange={this.changeGiverData.bind(this, 'tel')}/></td>
                                    <th>手機</th>
                                    <td><input value={this.state.cellphone} onChange={this.changeGiverData.bind(this, 'cellphone')}/></td>
                                </tr>
                                <tr>
                                    <th>mail</th>
                                    <td>{this.props.auth.profile.email}</td>
                                </tr>
                                </tbody>
                            </table>
                        </tag>
                    </div>
                </div>
                <div>
                    <button onClick={this.handleCommit}>確認</button>
                </div>
                <SelectCityZip open={this.state.openSelectCityZipPicker}
                               cities={this.state.definition.cities}
                               defaultChecked={this.state.serviceAreas}
                               onConfirm={this.onSelectCityZipCommit}
                               onRequestClose={this.onCloseSelectCityZip}/>
                <SelectSkills  open={this.state.openSelectSkillPicker}
                               skills={this.state.definition.skills}
                               defaultSubChecked={this.state.skills}
                               onConfirm={this.onSelectSkillCommit}
                               onRequestClose={this.onCloseSelectSkill}/>
                <SelectAbilities  open={this.state.openSelectAbilityPicker}
                                  abilities={this.state.definition.abilities}
                                  defaultSubChecked={this.state.abilities}
                                  onConfirm = {this.onSelectAbilityCommit}
                                  onRequestClose={this.onCloseSelectAbility}/>

            </div>
        );
    }
}