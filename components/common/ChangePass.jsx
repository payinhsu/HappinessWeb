import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import {Modal, Button, Image} from 'react-bootstrap';

export default class ChangePass extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            pwdStrength : "無"
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    checkPWD = (e) =>{
        console.log("計算密碼強度: ")
        console.log(e.target.value)
        var test = window.ac.utils.calPwdStrength(e.target.value)
        //console.log(test)
        if(test.message){
            this.setState({pwdStrength: test.message})
        }else if (test.level){
            this.setState({pwdStrength: test.level})
        }
    }    

	render() {
        // const actions = [
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        // ];
         return (
            // <Dialog
            //   contentStyle={{width:'90%', maxWidth: 'none'}}
            //   title="修改密碼"
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
                    <Modal.Title><p>修改密碼</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="listBox">
                    <div className="box">
                    	<tag>
                            <table>
                            	<tr>
	                            	<th>輸入舊密碼 :</th>
	                            	<td><input /></td>
	                            	<td>&nbsp;</td>
                            	</tr>
                            	<tr>
	                            	<th>輸入新密碼 :</th>
	                            	<td><input disabled={false} type="text" onChange={this.checkPWD}/></td>
	                            	<td>&nbsp;</td>
                            	</tr>
                            	<tr>
	                            	<th>確認新密碼 : </th>
	                            	<td><input /></td>
	                            	<td>顯示密碼</td>
                            	</tr>
                            	<tr>
	                            	<th>密碼強度 :</th>
	                            	<td colSpan="2"><input value={this.state.pwdStrength}/></td>
                            	</tr>
                            </table>
                        </tag>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
		 );
	}
}