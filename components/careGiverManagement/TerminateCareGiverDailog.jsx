import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

export default class TerminateCareGiverDailog extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            open: props.openTerminateCareGiverDailog,
            authData: context.authData,
            giver: props.terminateGiver,
            actions: props.actions
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openTerminateCareGiverDailog,
            giver : newProps.terminateGiver
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    handleCommit = () => {
        this.setState({open: false});
        // this.props.toCommit(this.state.giver);
        let institutionId = this.state.authData.careGiver.companyId;
        this.state.actions.terminateCareGiver(institutionId, this.state.giver.memberId);
        this.props.onRequestClose();
    };

    terminateGiver = (terminateGiver) => {

    };

    render() {
        return(
            <div className="modal-container">
                <style>{`
                    .modal-container th{background-color: rgb(0, 126, 180)}
                    .modal-container td{background-color: #f5f5f5}
                    .modal-container table{width: 100%}
                `}</style>
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">提醒您</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                            <tr>
                                <th>管家姓名</th>
                                <th>服務年資</th>
                                <th>服務時數</th>
                                <th>行動電話</th>
                                <th>E-mail</th>
                                <th>服務地區</th>
                                <th>證書</th>
                                <th>專長</th>
                            </tr>
                            <tr>
                                <td>
                                    {this.state.giver.name}
                                </td>
                                <td>
                                    {this.state.giver.serviceYears}
                                </td>
                                <td>
                                    {this.state.giver.serviceHours}
                                </td>
                                <td>
                                    {this.state.giver.cellphone}
                                </td>
                                <td>
                                    {this.state.giver.email}
                                </td>
                                <td>
                                    <textarea value={this.state.giver.serviceAreaIds.map(zip=> zip.name).join(", ")} disabled={true}/>
                                </td>
                                <td>
                                    <textarea value={this.state.giver.skillIds.map(skill=> skill.name).join(", ")} disabled={true}/>
                                </td>
                                <td>
                                    <textarea value={this.state.giver.abilityIds.map(ability=> ability.name).join(", ")} disabled={true}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <span>您將停權1筆資料，該筆資料停權後，將無法派案。</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Confirm
                            onConfirm={this.handleCommit}
                            body="確定要停權此管家？"
                            confirmText="確定"
                            cancelText="取消"
                            title="停權">
                            <Button>確認</Button>
                        </Confirm>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}