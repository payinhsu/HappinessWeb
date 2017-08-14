import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import moment from 'moment';
import {Modal, Button, Image} from 'react-bootstrap';

export default class ChangeRecords extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            insurantsChangeLogs: props.insurantsChangeLogs, 
            year: props.year
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            insurantsChangeLogs: newProps.insurantsChangeLogs,
            year: newProps.year
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    changeYear = (e) => {
        console.log(e.target.value) ;
        this.setState({year:parseInt(e.target.value)});
        this.props.onChangeYear(parseInt(e.target.value)) ;
    };

	render() {
        // const actions = [
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        // ];
		return(
            // <Dialog
            //   contentStyle={{width:'90%', maxWidth: 'none'}}
            //   title="變更紀錄"
            //   actions={actions}
            //   modal={false}
            //   open={this.state.open}
            //   onRequestClose={this.handleClose}
            //   autoScrollBodyContent={true}
            // >
            // <Divider />
            <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>變更紀錄</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div id="portal">
                <div className="listBox">
                    <div className="box">
                        <select value={this.state.year} onChange={this.changeYear.bind(this)}>
                            <option>2016</option>
                            <option>2017</option>
                        </select>
                    	<tag>
                            <table>
                            <tbody>
                            	<tr>
                            		<th>申請日期</th>
                                    <th>原保障資格</th>
                            		<th>姓名</th>
                            		<th>變更原因</th>
                            		<th>狀態</th>
                            	</tr>
                                {this.state.insurantsChangeLogs.map((model, index) => 
                                    <tr>
                                        <td>{ moment(model.changeDate).format("YYYY-MM-DD")}</td>
                                        <td>{model.originState}</td>
                                        <td>{model.name}</td>
                                        <td>{model.reason}</td>
                                        <td>{model.currentState}</td>
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
            //</Dialog>
		);
	}
}