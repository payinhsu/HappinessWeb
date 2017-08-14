import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import api from 'api/HappinessAPI';
import SelectCityZip from 'components/operationsManagement/SelectCityZip';
import SelectSkills from 'components/common/SelectSkills';
import SelectAbilities from 'components/common/SelectAbilities';
import { Image } from 'react-bootstrap';
import Document from 'components/common/Document';

export default class CareManagerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //update model
            model: {
                email: props.auth.profile.email,
                cellphone: props.auth.profile.cellphone,
                tel: props.auth.profile.tel,
                serviceYears: props.auth.careManager.serviceYears,
                serviceHours: props.auth.careManager.serviceHours,
                skillIds: [],
                abilities: [],
                serviceAreaIds: [],
                headFileKey: props.auth.careManager.headFileKey || '',
                responsibleMemberId: props.auth.careManager.responsibleMemberId,
                // unnecessary
                headPhoto: props.auth.careManager.headPhoto
            },
            skills: props.auth.skills.map(s => Object.assign(s, {checked: true})) || [],
            abilities: props.auth.abilities.map(s => Object.assign(s, {checked: true}))  || [],
            serviceAreas: props.auth.careManager.serviceAreas.map(zip => {
                return {
                    'id': zip.zipId,
                    'name': zip.zipName,
                    'checked': true
                }
            }) || [],
            openSelectCityZipPicker: false,
            openSelectAbilityPicker: false,
            openSelectSkillPicker: false
        };

        this.handleCommit = this.handleCommit.bind(this);
    }

    handleCommit() {
        this.state.model.serviceAreaIds = this.state.serviceAreas.map(zip => zip.id);
        this.state.model.skillIds = this.state.skills.map(s => s.id);
        this.state.model.abilities = this.state.abilities.map(a => a.id);
        if(!this.state.model.headFileKey)
            this.state.model.headFileKey = undefined;

        this.props.onCommit(this.state.model);
    }


    handleChange = (field, e) => {
        if (field == 'serviceHours' || field == 'serviceYears') {
            let integerTime = parseInt(e.target.value) || '';
            this.state.model[field] = integerTime;
        } else if(field == 'headPhoto' || field == 'headFileKey') {
            this.state.model[field] = e;
        }
        else {
            this.state.model[field] = e.target.value;
        }

        this.setState({model: this.state.model});
    };

    onSelectCityZipCommit = (model) => {
        // not use - console.log('on select city');
    };


    onSelectSkillsCommit = (model) => {
        // not use - console.log('on select skill');
    };

    onSelectAbilitiesCommit = (model) => {
        // not use - console.log('on select abilities');
    };


    onCloseSelectCityZip = () => {
        this.setState({openSelectCityZipPicker: false});
    };

    onCloseSelectSkills = () => {
        this.setState({openSelectSkillPicker: false});
    };

    onCloseSelectAbilities = () => {
        this.setState({openSelectAbilityPicker: false});
    };

    render() {
        return (
            <div className="box">
                <tag>
                    <table>
                        <tbody>
                        <tr>
                            <th rowSpan="5">
                                <Image src={this.state.model.headPhoto} circle/>
                                <Document
                                    auth={this.props.auth}
                                    docType="image"
                                    convertType="profile-image"
                                    onUpload={this.handleChange.bind(this,'headFileKey')}
                                    onFileUrl={this.handleChange.bind(this, 'headPhoto')}
                                    displayTag="WebThumbnail"
                                    btnName="上傳照片"
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>
                                {this.props.auth.profile.name}
                            </td>
                            <th>性別</th>
                            <td>{this.props.auth.profile.sex === "1" ? "男" : "女"}</td>
                            <th>服務年資</th>
                            <td>
                                <input type="text" value={this.state.model.serviceYears}
                                       onChange={this.handleChange.bind(this, 'serviceYears')}/>
                            </td>
                            <th>服務時數</th>
                            <input type="text" value={this.state.model.serviceHours}
                                   onChange={this.handleChange.bind(this, 'serviceHours')}/>
                        </tr>
                        <tr>
                            <th>專業證照</th>
                            <td>
                                <textarea value={this.state.skills.map(skill => skill.name).join(", ")}
                                          onClick={() => this.setState({openSelectSkillPicker: true})}/>
                            </td>
                            <th>專長</th>
                            <td>
                                <textarea value={this.state.abilities.map(ability => ability.name).join(", ")}
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
                            <td>
                                <input type="text" value={this.state.model.tel}
                                       onChange={this.handleChange.bind(this, 'tel')}/>
                            </td>
                            <th>手機</th>
                            <td>
                                <input type="text" value={this.state.model.cellphone}
                                       onChange={this.handleChange.bind(this, 'cellphone')}/>
                            </td>
                        </tr>
                        <tr>
                            <th>email</th>
                            <td>
                                <input type="text" value={this.state.model.email}
                                       onChange={this.handleChange.bind(this, 'email')}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <a href="javascript:void(0);"
                       onClick={this.handleCommit}
                       className="btn-default btn-lightCoral float-right">
                        更新
                    </a>
                </tag>

                <SelectCityZip open={this.state.openSelectCityZipPicker}
                               cities={this.props.initialization.cities}
                               defaultChecked={this.state.serviceAreas}
                               onConfirm={this.onSelectCityZipCommit}
                               onRequestClose={this.onCloseSelectCityZip}/>
                <SelectSkills open={this.state.openSelectSkillPicker}
                              skills={this.props.initialization.skills}
                              defaultSubChecked={this.state.skills}
                              onConfirm={this.onSelectSkillsCommit}
                              onRequestClose={this.onCloseSelectSkills}/>
                <SelectAbilities open={this.state.openSelectAbilityPicker}
                                 abilities={this.props.initialization.abilities}
                                 defaultSubChecked={this.state.abilities}
                                 onConfirm={this.onSelectAbilitiesCommit}
                                 onRequestClose={this.onCloseSelectAbilities}/>
            </div>

        )
    }
}
