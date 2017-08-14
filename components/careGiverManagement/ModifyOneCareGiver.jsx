import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import SelectCityZip from 'components/operationsManagement/SelectCityZip';
import SelectSkills from 'components/common/SelectSkills';
import SelectAbilities from 'components/common/SelectAbilities';

export default class ModifyOneCareGiver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openUpdateOneGiver,
            giver: props.giver,
            isNew: props.isNew,
            definition: props.definition,
            openSelectCityZipPicker: false,
            openSelectAbilityPicker: false,
            openSelectSkillPicker: false
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openUpdateOneGiver,
            giver: newProps.giver,
            isNew: newProps.isNew,
            definition: newProps.definition,
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };
    handleCommit = () => {
        let giver = this.state.giver;
        let errorCheckCount = 0;
        let needToCheckKey = ["familyName","firstName","sex","cellphone","email",
            "serviceYears","serviceHours"]
        Object.keys(giver).forEach((key) =>
            {
                if(needToCheckKey.includes(key) && giver[key] === '')
                    errorCheckCount++;
            }
        )
        if(errorCheckCount > 0){
            alert("欄位不得有空值");
        }else{
            this.setState({giver:giver},this.props.toCommit(giver));
        }
    };

    changeGiverData = (field, e) => {
        let serviceHours = 0;
        if(field === 'serviceHours') {
            if(e.target.value.length == 0){
                this.state.giver[field] = serviceHours;
            }else {
                serviceHours = parseInt(e.target.value);
                this.state.giver[field] = serviceHours;
            }
        }else{
            this.state.giver[field] = e.target.value;
        }
        this.setState({giver:this.state.giver});
    };

    changeCareGiverServiceYears = (field, e) => {
        this.state.giver[field] = parseInt(e.target.value);
        this.setState({giver:this.state.giver});
    };

    onSelectCityZipCommit = (model) => {
        this.state.giver.serviceAreaIds = model ;
        this.setState({giver: this.state.giver});
    };
    onCloseSelectCityZip = () => {
        this.setState({openSelectCityZipPicker:false}) ;
    };

    onSelectSkillsCommit = (model) => {
        this.state.giver.skillIds = model ;
        this.setState({giver: this.state.giver});
    };
    onCloseSelectSkills = () => {
        this.setState({openSelectSkillPicker:false}) ;
    };

    onSelectAbilitiesCommit = (model) => {
        this.state.giver.abilityIds = model ;
        this.setState({giver: this.state.giver});
    };
    onCloseSelectAbilities = () => {
        this.setState({openSelectAbilityPicker:false}) ;
    };

    render() {
        let optionServiceYears = [];
        for(let i=0;i<=30;i++){
            optionServiceYears.push(i);
        }
        return(
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            編輯管家資料
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            {this.state.isNew ?
                                <tbody>
                                    <tr className="tr-blue">
                                        <th><font style={{color:"red"}}>*</font>姓</th>
                                        <td>
                                            <input value={this.state.giver.familyName}
                                                   onChange={this.changeGiverData.bind(this, 'familyName')}/>
                                        </td>
                                        <th><font style={{color:"red"}}>*</font>名</th>
                                        <td>
                                            <input value={this.state.giver.firstName}
                                                   onChange={this.changeGiverData.bind(this, 'firstName')}/>
                                        </td>
                                        <th><font style={{color:"red"}}>*</font>性別</th>
                                        <td>
                                            <div>
                                                <input name="sex" type="radio" value="1"
                                                       onChange={this.changeGiverData.bind(this,'sex')}
                                                       checked={this.state.giver.sex === '1'}/>男
                                                <input name="sex" type="radio" value="0"
                                                       onChange={this.changeGiverData.bind(this,'sex')}
                                                       checked={this.state.giver.sex === '0'}/>女
                                            </div>
                                        </td>
                                        <th><font style={{color:"red"}}>*</font>服務年資</th>
                                        <td>
                                            <select value={this.state.giver.serviceYears}
                                                    onChange={this.changeCareGiverServiceYears.bind(this, 'serviceYears')}>
                                                <option value=""></option>
                                                {optionServiceYears.map((year, index) => (
                                                    <option value={year}>{year}</option>
                                                ))}
                                            </select>年
                                        </td>
                                        <th><font style={{color:"red"}}>*</font>服務時數</th>
                                        <td>
                                            <input type="number" value={this.state.giver.serviceHours}
                                                   onChange={this.changeGiverData.bind(this, 'serviceHours')}/>小時
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th><font style={{color:"red"}}>*</font>行動電話</th>
                                        <td>
                                            <input value={this.state.giver.cellphone}
                                                   onChange={this.changeGiverData.bind(this, 'cellphone')}/>
                                        </td>
                                        <th><font style={{color:"red"}}>*</font>E-mail</th>
                                        <td colSpan="3">
                                            <input value={this.state.giver.email}
                                                   onChange={this.changeGiverData.bind(this, 'email')}/>
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>服務地區</th>
                                        <td>
                                            <textarea
                                                value={this.state.giver.serviceAreaIds.map(zip=> zip.name).join(", ")}
                                                onClick={() => this.setState({openSelectCityZipPicker: true})}/>
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>證照</th>
                                        <td>
                                            <textarea
                                                value={this.state.giver.skillIds.map(skill=> skill.name).join(", ")}
                                                onClick={() => this.setState({openSelectSkillPicker: true})}/>
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>專長</th>
                                        <td>
                                            <textarea value={this.state.giver.abilityIds.map(ability=> ability.name).join(", ")}
                                                      onClick={() => this.setState({openSelectAbilityPicker: true})}/>
                                        </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr className="tr-blue">
                                        <th>姓名</th>
                                        <td>
                                            {this.state.giver.familyName + this.state.giver.firstName}
                                        </td>
                                        <th>服務年資</th>
                                        <td>
                                            <select value={this.state.giver.serviceYears}
                                                    onChange={this.changeCareGiverServiceYears.bind(this, 'serviceYears')}>
                                                <option value=""></option>
                                                {optionServiceYears.map((year, index) => (
                                                    <option value={year}>{year}</option>
                                                ))}
                                            </select>年
                                        </td>
                                        <th>服務時數</th>
                                        <td>
                                            <input type="number" value={this.state.giver.serviceHours}
                                                   onChange={this.changeGiverData.bind(this, 'serviceHours')}/>小時
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>行動電話</th>
                                        <td>
                                            <input value={this.state.giver.cellphone}
                                                   onChange={this.changeGiverData.bind(this, 'cellphone')}/>
                                        </td>
                                        <th>E-mail</th>
                                        <td>
                                            {this.state.giver.email}
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>服務地區</th>
                                        <td>
                                            <textarea
                                                value={this.state.giver.serviceAreaIds.map(zip=> zip.name).join(", ")}
                                                onClick={() => this.setState({openSelectCityZipPicker: true})}/>
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>證照</th>
                                        <td>
                                            <textarea
                                                value={this.state.giver.skillIds.map(skill=> skill.name).join(", ")}
                                                onClick={() => this.setState({openSelectSkillPicker: true})}/>
                                        </td>
                                    </tr>
                                    <tr className="tr-blue">
                                        <th>專長</th>
                                        <td>
                                            <textarea value={this.state.giver.abilityIds.map(ability=> ability.name).join(", ")}
                                                      onClick={() => this.setState({openSelectAbilityPicker: true})}/>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                        <SelectCityZip open={this.state.openSelectCityZipPicker}
                                       cities={this.state.definition.cities}
                                       defaultChecked={this.state.giver.serviceAreaIds}
                                       onConfirm={this.onSelectCityZipCommit}
                                       onRequestClose={this.onCloseSelectCityZip}/>
                        <SelectSkills  open={this.state.openSelectSkillPicker}
                                       skills={this.state.definition.skills}
                                       defaultSubChecked={this.state.giver.skillIds}
                                       onConfirm={this.onSelectSkillsCommit}
                                       onRequestClose={this.onCloseSelectSkills}/>
                        <SelectAbilities  open={this.state.openSelectAbilityPicker}
                                          abilities={this.state.definition.abilities}
                                          defaultSubChecked={this.state.giver.abilityIds}
                                          onConfirm={this.onSelectAbilitiesCommit}
                                          onRequestClose={this.onCloseSelectAbilities}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            <Button onClick={this.handleCommit}>確認</Button>
                        }

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}