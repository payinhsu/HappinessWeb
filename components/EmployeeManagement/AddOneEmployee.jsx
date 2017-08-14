import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Modal,Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class AddOneEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openAddOneEmployee,
            employee: props.employee,
            isNew: props.isNew
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.openAddOneEmployee,
            employee: newProps.employee
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };
    handleCommit = () => {
        let employee = this.state.employee;
        let errorCheckCount = 0;
        Object.keys(employee).forEach((key) =>
            {
                if(employee[key] === '')
                    errorCheckCount++;
            }
        )
        if(errorCheckCount > 0){
            alert("欄位不得有空值");
        }else{
            this.setState({employee:employee},this.props.toCommit(employee));
        }
    };

    handleUpdate = () => {

    };

    changeEmployeeData(field, e, date){
        this.state.employee[field] = e.target.value;
        this.setState({employee:this.state.employee});
    };

    handleOnBoardDate = (field, e, date) => {
        let employee = Object.assign({}, this.state.employee);
        employee[field] = date;//moment(date).format('YYYY-MM-DD');
        this.state.employee = employee;
        this.setState({employee:employee});
    }

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
                        <Modal.Title id="contained-modal-title-lg"></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th>員工編號</th>
                                    <td>
                                        {this.state.isNew ? <input value={this.state.employee.id}
                                                               onChange={this.changeEmployeeData.bind(this,'id')}/>
                                            : this.state.employee.id}
                                    </td>
                                    <th>員工姓</th>
                                    <td>
                                        {this.state.isNew ? <input value={this.state.employee.familyName}
                                                                   onChange={this.changeEmployeeData.bind(this,'familyName')}/>
                                            : this.state.employee.familyName}
                                    </td>
                                    <th>名</th>
                                    <td>
                                        {this.state.isNew ? <input value={this.state.employee.firstName}
                                                                   onChange={this.changeEmployeeData.bind(this,'firstName')}/>
                                            : this.state.employee.firstName}
                                    </td>
                                    <th>性別</th>
                                    <td>
                                        {this.state.isNew ?
                                            <div>
                                                <input name="sex" type="radio" value="1"
                                                       onChange={this.changeEmployeeData.bind(this,'sex')}
                                                       checked={this.state.employee.sex === '1'}/>男
                                                <input name="sex" type="radio" value="0"
                                                       onChange={this.changeEmployeeData.bind(this,'sex')}
                                                       checked={this.state.employee.sex === '0'}/>女
                                            </div>
                                            : this.state.employee.sex === "1" ? '男': '女'
                                        }
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                    <th>手機</th>
                                    <td>
                                        <input value={this.state.employee.cellphone}
                                               onChange={this.changeEmployeeData.bind(this,'cellphone')}/>
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                    <th>公司電話(O)</th>
                                    <td>
                                        <input value={this.state.employee.companyTel}
                                        onChange={this.changeEmployeeData.bind(this,'companyTel')}/>
                                    </td>
                                    <th>分機</th>
                                    <td>
                                        <input value={this.state.employee.companyTelExt} onChange={this.changeEmployeeData.bind(this,'companyTelExt')} />
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                    <th>電子信箱</th>
                                    <td>
                                        {this.state.isNew ?
                                        <input value={this.state.employee.email}
                                               style={{width:"100%"}}
                                               onChange={this.changeEmployeeData.bind(this,'email')}/>
                                        : this.state.employee.email
                                        }
                                    </td>
                                </tr>
                                <tr className="tr-blue">
                                    <th>到職日</th>
                                    <td>
                                        <DatePicker value={this.state.employee.onBoardDate}
                                                    onChange={this.handleOnBoardDate.bind(this,'onBoardDate')}
                                                    dateFormat="YYYY-MM-DD"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.state.isNew ? <Button onClick={this.handleCommit}>確認</Button>
                                : <Button onClick={this.handleUpdate}>確認</Button>
                        }

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}