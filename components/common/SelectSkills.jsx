import React from 'react';
import { Modal} from 'react-bootstrap';

/**
 * imput model: [{value:'..', name:'..', checked: boolean}, ..]
 */
export default class SelectSkills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            skills: props.skills,
            defaultSubChecked: props.defaultSubChecked,
            skill: props.skills[0],
            skillId: props.skills[0] ? props.skills[0].idLevel1 : "",
            subSkill:props.skills[0].level1Content[0],
            subSkillId: props.skills[0].level1Content[0].idLevel2
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            open: newProps.open,
            skills: newProps.skills,
            defaultSubChecked: newProps.defaultSubChecked,
            skill:newProps.skills[0],
            skillId: newProps.skills[0] ? newProps.skills[0].idLevel1 : "",
            subSkill:newProps.skills[0].level1Content[0],
            subSkillId: newProps.skills[0].level1Content[0].idLevel2
        });
    };

    handleClose = () => {
        this.setState({
            defaultSubChecked:this.state.defaultSubChecked,
            open: false
        });
        this.props.onRequestClose();
    };

    handleSubSkillsCheck = (itemId, itemName, e) => {
        const checked = e.target.checked;
        if(checked)
            this.state.defaultSubChecked.push({"id":itemId , "name":itemName, checked:e.target.checked});
        else
            this.state.defaultSubChecked.splice(this.state.defaultSubChecked.indexOf( this.state.defaultSubChecked.find(dskill => dskill.id == itemId) ), 1);
        this.setState({defaultSubChecked: this.state.defaultSubChecked}) ;
        // console.log("defaultSubChecked : " + JSON.stringify(this.state.defaultSubChecked));
    };

    handleConfirm = () => {
        let selectModels = this.state.defaultSubChecked ; //.map(zip => zip.id);
        this.props.onConfirm(selectModels);
        this.handleClose();
    };
    handleSkillChange = (e) => {
        // console.log(e.target.value) ;
        // console.log(this.state.skills);
        let skill = this.state.skills.find(skill => skill.idLevel1 === e.target.value) ;
        this.setState({skill: skill}) ;
        this.setState({skillId: skill.idLevel1});
        this.setState({subSkill: skill.level1Content[0]}) ;
        this.setState({subSkillId: skill.level1Content[0].idLevel2});
        //console.log(JSON.stringify(this.state.skill)) ;
    };

    handleSubSkillChange = (e) => {
        let skill = this.state.skill.level1Content.find(skill => skill.idLevel2 === e.target.value) ;
        this.setState({subSkill: skill}) ;
        this.setState({subSkillId: skill.idLevel2});
    };

    handleCheckSubSkillCheck = (skillId) => {
        let isTrue = this.state.defaultSubChecked.find(dskill => dskill.id === skillId) != undefined ;
        return isTrue ;
    };
    cleanAll = () => {
        this.setState({defaultSubChecked : []});
    };
    render() {

        const checkboxes = this.state.subSkill.level2Content.map((subSkill,index)  =>

            <label key={`checkboxes_${index}`}>
                <input
                    type="checkbox"
                    onChange={this.handleSubSkillsCheck.bind(this, subSkill.idLevel3, subSkill.nameLevel3)}
                    checked={this.handleCheckSubSkillCheck(subSkill.idLevel3)}
                />
                {subSkill.nameLevel3}
            </label>
        );

        const checkedboxes = this.state.defaultSubChecked.map((skill,index) =>
            <label key={`checkedboxes_${index}`}>
                <input
                    type="checkbox"
                    checked={skill.checked}
                    onChange={this.handleSubSkillsCheck.bind(this, skill.id, skill.name)}
                />
                {skill.name}
            </label>
        );
        const layerSelect = (
            <select value={this.state.skill.idLevel1} onChange={this.handleSkillChange}>
                {this.state.skills.map((skill, index) =>
                    <option value={skill.idLevel1} key={`skill${index}`}>{skill.nameLevel1}</option>
                )}
            </select>
        );

        const layerSubSelect = (
            <select value={this.state.subSkillId} onChange={this.handleSubSkillChange}>
                {this.state.skill.level1Content.map((subSkill, index) =>
                    <option value={subSkill.idLevel2} key={`subSkill${index}`}>{subSkill.nameLevel2}</option>
                )}
            </select>
        );

        return (
            <div>

                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title><p>請選擇</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>已選項目 {this.state.defaultSubChecked.length > 0 ? <button onClick={this.cleanAll}>全部清除</button> :''}</h4>
                        {checkedboxes}

                        <h4>分類選單</h4>
                        {layerSelect}
                        <h4>分類子選單</h4>
                        {layerSubSelect}
                        <h4>可選項目</h4>
                        {checkboxes}
                        <div>
                            <button onClick={this.handleConfirm}>確認</button>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}