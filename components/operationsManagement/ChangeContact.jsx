import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Modal, Button, Image} from 'react-bootstrap';

export default class ChangeContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            employees: props.employees,
            selectStr: "",
            type: props.type
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            employees: newProps.employees,
            selectStr: "",
            type: newProps.type
        };
        this.setState(nextState);
    };

    changeSelectStr = (e) => {
        let str = e.target.value ;
        this.setState({selectStr:str});
    };
    findEm = () => {
        //console.log("in findEm") ;
        let selectStr = this.state.selectStr ;
        if(selectStr != "") {
            //console.log("in process") ;
            let employees = this.props.employees.filter(em => 
                em.email.indexOf(selectStr) >= 0 || em.name.indexOf(selectStr) >= 0
            ) ;
            this.setState({employees:employees});
        } else {
            this.setState({employees:this.props.employees});
        }
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    ChangeContactCommit = (em) => {
        this.setState({open: false});
        if(this.state.type == "") {
            this.props.onCommit(this.state.type, em) ;      // master
        } else {
            this.props.onCommitContacts(this.state.type, em) ;  // business or financial Contact
        }
    };

	render() {
		return(
            <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>變更企業客戶業務聯繫人資料</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div id="portal">
                <div className="listBox">
                    <div className="box">
                        <input value={this.state.selectStr}
                               onChange={this.changeSelectStr.bind(this)}/> 
                        <button onClick={this.findEm}>查詢</button> 
                    	<tag>
                            <table>
                            <tbody>
                            	<tr>
                            		<th>姓名</th>
                                    <th>E-mail</th>
                            		<th>動作</th>
                            	</tr>
                                {this.state.employees.map((em, index) => 
                                    <tr>
                                        <td>{em.name}</td>
                                        <td>{em.email}</td>
                                        <td>
                                            <button onClick={this.ChangeContactCommit.bind(this,em)}>確認</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </table>
                        </tag>
                    </div>
                </div>
			</div>
            </Modal.Body>
          </Modal>
		);
	}
}