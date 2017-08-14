import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';

export default class AddOneGiverConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openAddOneGiverConfirm,
            giver: props.giver
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openAddOneGiverConfirm,
            giver : newProps.giver
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    handleCommit = () => {
        this.setState({open: false});
        this.props.toCommit();
    };

    render() {
        return(
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">新增個別管家確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                            <tr className="tr-blue">
                                <th colSpan="2">管家姓名</th>
                                <th colSpan="2">服務年資</th>
                                <th colSpan="2">服務時數</th>
                                <th colSpan="2">行動電話</th>
                                <th colSpan="2">E-mail</th>
                                <th colSpan="2">服務地區</th>
                                <th colSpan="2">證書</th>
                                <th colSpan="2">專長</th>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {this.state.giver.familyName + this.state.giver.firstName}
                                </td>
                                <td colSpan="2">
                                    {this.state.giver.serviceYears}
                                </td>
                                <td colSpan="2">
                                    {this.state.giver.serviceHours}
                                </td>
                                <td colSpan="2">
                                    {this.state.giver.cellphone}
                                </td>
                                <td colSpan="2">
                                    {this.state.giver.email}
                                </td>
                                <td colSpan="2">
                                    <textarea value={this.state.giver.serviceAreaIds.map(zip=> zip.name).join(", ")} disabled={true}/>
                                </td>
                                <td colSpan="2">
                                    <textarea value={this.state.giver.skillIds.map(skill=> skill.name).join(", ")} disabled={true}/>
                                </td>
                                <td colSpan="2">
                                    <textarea value={this.state.giver.abilityIds.map(ability=> ability.name).join(", ")} disabled={true}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <span>確認後，系統將自動發出邀請照顧管家驗證啟用信函至該員的電子信箱。</span>
                        <Button onClick={this.handleCommit}>確認</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}