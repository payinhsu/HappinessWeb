import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class AddOneEmployeeConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openAddOneEmployeeConfirm,
            employee: props.employee
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openAddOneEmployeeConfirm,
            employee : newProps.employee
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
                        <Modal.Title id="contained-modal-title-lg">確認員工資料</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th colSpan="2">員工編號</th>
                                    <td colSpan="2">
                                        {this.state.employee.id}
                                    </td>
                                    <th colSpan="2">姓名</th>
                                    <td colSpan="2">
                                        {this.state.employee.familyName}{this.state.employee.firstName}
                                    </td>
                                    <th colSpan="2">性別</th>
                                    <td colSpan="2">
                                        {this.state.employee.sex === "1" ? '男': '女'}
                                    </td>
                                    <th colSpan="2">手機</th>
                                    <td colSpan="2">
                                        {this.state.employee.cellphone}
                                    </td>
                                    <th colSpan="2">公司電話/分機</th>
                                    <td colSpan="2">
                                        {this.state.employee.companyTel}
                                        分機{this.state.employee.companyTelExt}
                                    </td>
                                    <th colSpan="2">電子信箱</th>
                                    <td colSpan="2">
                                        {this.state.employee.email}
                                    </td>
                                    <th colSpan="2">到職日</th>
                                    <td colSpan="2">
                                        <DatePicker value={this.state.employee.onBoardDate}
                                                disabled={true}
                                                dateFormat="YYYY-MM-DD"/>
                                    </td>
                                </tr>
                                <tr><td rowSpan="14"></td></tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <span>確認後，系統將自動發出邀請新進員工填報保障對象信函至該員的電子信箱。</span>
                        <Button onClick={this.handleCommit}>確認</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}