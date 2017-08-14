import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

export default class TerminateMemberDailog extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            open: props.openTerminateMemberDailog,
            employee: props.employee,
            leaveDate: moment().format(),
            authData: context.authData,
            actions: props.actions
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openTerminateMemberDailog,
            employee : newProps.employee,
            leaveDate: moment().format()
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    handleCommit = () => {
        if (this.state.employee.leaveDate === -1)
            this.state.employee.leaveDate = moment(this.state.leaveDate, "YYYY-MM-DD").valueOf();
        let onBoardDate = moment(moment(this.state.employee.onBoardDate).format('YYYY-MM-DD'),"YYYY-MM-DD").valueOf();
        if(this.state.employee.leaveDate >= onBoardDate){
            this.setState({open: false});
            this.setState({leaveDate: moment().format()});
            // this.props.toCommit(this.state.employee);
            let enterpriseId = this.state.authData.employee.companyId;
            this.state.actions.leaveEnterprise(enterpriseId, this.state.employee.id, {"leaveDate": this.state.employee.leaveDate});
            this.props.onRequestClose();
        }else{
            alert("離職日必須大於或等於到職日");
        }
    };

    handleLeaveDate = (e, date) => {
        let leaveDate = moment(date, "YYYY-MM-DD").valueOf();
        this.state.employee.leaveDate = leaveDate;
        this.setState({leaveDate:date});
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
                                <th>員工編號</th>
                                <th>姓名</th>
                                <th>性別</th>
                                <th>公司電話</th>
                                <th>分機</th>
                                <th>電子信箱</th>
                                <th>到職日</th>
                                <th>離職日</th>
                            </tr>
                            <tr>
                                <td>
                                    {this.state.employee.id}
                                </td>
                                <td>
                                    {this.state.employee.name}
                                </td>
                                <td>
                                    {this.state.employee.sex === "1" ? '男': '女'}
                                </td>
                                <td>
                                    {this.state.employee.companyTel}
                                </td>
                                <td>
                                    {this.state.employee.companyTelExt}
                                </td>
                                <td>
                                    {this.state.employee.email}
                                </td>
                                <td>
                                    {moment(moment(this.state.employee.onBoardDate).toDate()).format('YYYY-MM-DD') }
                                </td>
                                <td>
                                    <DatePicker value={this.state.leaveDate}
                                                onChange={this.handleLeaveDate.bind(this)}
                                                dateFormat="YYYY-MM-DD"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <span>您將停權1筆資料，該筆資料停權後，若需更改請洽系統管理員。</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Confirm
                            onConfirm={this.handleCommit}
                            body="確定要停權此員工？"
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