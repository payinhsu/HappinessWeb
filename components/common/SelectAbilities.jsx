import React from 'react';
import { Modal} from 'react-bootstrap';

/**
 * imput model: [{value:'..', name:'..', checked: boolean}, ..]
 */
export default class SelectAbilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            abilities: props.abilities,
            defaultSubChecked: props.defaultSubChecked,
            ability: props.abilities[0],
            abilityId: props.abilities[0] ? props.abilities[0].idLevel1 : "",
            subAbility:props.abilities[0].level1Content[0],
            subAbilityId: props.abilities[0].level1Content[0].idLevel2
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            open: newProps.open,
            abilities: newProps.abilities,
            defaultSubChecked: newProps.defaultSubChecked,
            ability: newProps.abilities[0],
            abilityId: newProps.abilities[0] ? newProps.abilities[0].idLevel1 : "",
            subAbility:newProps.abilities[0].level1Content[0],
            subAbilityId: newProps.abilities[0].level1Content[0].idLevel2
        });
    };

    handleClose = () => {
        this.setState({
            defaultSubChecked:this.state.defaultSubChecked,
            open: false
        });
        this.props.onRequestClose();
    };

    handleSubAbilityCheck = (itemId, itemName, e) => {
        const checked = e.target.checked;
        if(checked)
            this.state.defaultSubChecked.push({"id":itemId , "name":itemName, checked:e.target.checked});
        else
            this.state.defaultSubChecked.splice(this.state.defaultSubChecked.indexOf( this.state.defaultSubChecked.find(ability => ability.id == itemId) ), 1);
        this.setState({defaultSubChecked: this.state.defaultSubChecked}) ;
        // console.log("defaultSubChecked : " + JSON.stringify(this.state.defaultSubChecked));
    };

    handleConfirm = () => {
        let selectModels = this.state.defaultSubChecked ; //.map(zip => zip.id);
        this.props.onConfirm(selectModels);
        this.handleClose();
    };
    handleAbilityChange = (e) => {
        // console.log(e.target.value) ;
        // console.log(this.state.skills);
        let ability = this.state.abilities.find(ability => ability.idLevel1 === e.target.value) ;
        this.state.ability = ability;
        this.setState({ability: this.state.ability}) ;
        this.state.abilityId = ability.idLevel1;
        this.setState({abilityId: this.state.abilityId});
        this.state.subAbility = ability.level1Content[0];
        this.setState({subAbility: this.state.subAbility}) ;
        this.state.subAbilityId = ability.level1Content[0].idLevel2;
        this.setState({subAbilityId: this.state.subAbilityId});
        // console.log(this.state.ability) ;
        // console.log(this.state.ability.sub) ;
        // console.log(this.state.subAbility) ;
        // console.log(this.state.subAbilityId) ;

    };

    handleSubAbilityChange = (e) => {
        let ability = this.state.ability.level1Content.find(subAbility => subAbility.idLevel2 === e.target.value) ;
        this.state.subAbility = ability;
        this.setState({subAbility: this.state.subAbility}) ;
        this.state.subAbilityId = ability.idLevel2;
        this.setState({subAbilityId: this.state.subAbilityId});
    };

    handleCheckSubAbilityCheck = (abilityId) => {
        let isTrue = this.state.defaultSubChecked.find(subAbility => subAbility.id === abilityId) != undefined ;
        return isTrue ;
    };
    cleanAll = () => {
        this.setState({defaultSubChecked : []});
    };
    render() {

        const checkboxes = this.state.subAbility.level2Content.map((subAbility,index)  =>

            <label key={`checkboxes_${index}`}>
                <input
                    type="checkbox"
                    onChange={this.handleSubAbilityCheck.bind(this, subAbility.idLevel3, subAbility.nameLevel3)}
                    checked={this.handleCheckSubAbilityCheck(subAbility.idLevel3)}
                />
                {subAbility.nameLevel3}
            </label>
        );

        const checkedboxes = this.state.defaultSubChecked.map((ability,index) =>
            <label key={`checkedboxes_${index}`}>
                <input
                    type="checkbox"
                    checked={ability.checked}
                    onChange={this.handleSubAbilityCheck.bind(this, ability.id, ability.name)}
                />
                {ability.name}
            </label>
        );
        const layerSelect = (
            <select value={this.state.ability.idLevel1} onChange={this.handleAbilityChange}>
                {this.state.abilities.map((ability, index) =>
                    <option value={ability.idLevel1} key={`ability${index}`}>{ability.nameLevel1}</option>
                )}
            </select>
        );

        const layerSubSelect = (
            <select value={this.state.subAbilityId} onChange={this.handleSubAbilityChange}>
                {this.state.ability.level1Content.map((subAbility, index) =>
                    <option value={subAbility.idLevel2} key={`subAbility${index}`}>{subAbility.nameLevel2}</option>
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