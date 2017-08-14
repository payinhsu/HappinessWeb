import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import { Modal, Button, Image} from 'react-bootstrap';

export default class AddMember extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            updateMember: props.updateMember, 
            roles: props.roles
        }
        //console.log("robin cons : " + JSON.stringify(this.state.updateMember)) ;
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open, 
            updateMember: newProps.updateMember,
            roles: newProps.roles
        };
        this.setState(nextState);
        console.log("robin rece : " + JSON.stringify(this.state.updateMember)) ;
        //console.log("robin rece : " + JSON.stringify(this.state.roles)) ;
    };

    handlePermissionCheck = (itemValue, e) => {
        let updateMember = this.state.updateMember;
        const checked = e.target.checked;
        if(checked)
            updateMember.roles.push(itemValue.id);
        else
            updateMember.roles.splice(updateMember.roles.indexOf(itemValue.id), 1);
        
        this.setState({updateMember: this.state.updateMember});
        console.log(this.state.updateMember.roles);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    handleCommit = () => {
        this.setState({open: false});
        this.props.onCommit(this.state.updateMember);
    };

	render() {
        // const actions = [
        //   <FlatButton
        //     label="取消"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        //   <FlatButton
        //     label="確認"
        //     primary={true}
        //     onTouchTap={this.handleCommit}
        //   />,
        // ];
        // console.log(this.state.updateMember.roles);
		return(
            // <Dialog
            //   contentStyle={{width:'90%', maxWidth: 'none'}}
            //   title="新增管理者"
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
                <Modal.Title><p>編輯管理者</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div id="portal">
            <div className="listBox">
                <div className="box">
                    <tag>
                        <table>
                            <tr className="tr-blue">
                                <th>帳號</th>
                                <td>{this.state.updateMember.email}</td>
                            </tr>
                            <tr className="tr-blue">
                                <th>顯示名稱</th>
                                <td>{this.state.updateMember.name}</td>
                            </tr>
                            <tr className="tr-blue">
                                <th>角色設定</th>
                                <td>
                                    {this.state.roles.map(per => 
                                        <div>
                                            <input type="checkbox" 
                                                onChange={this.handlePermissionCheck.bind(this, per)}
                                                checked={this.state.updateMember.roles.indexOf(per.id) != -1} />
                                            {per.name}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </table>
                    </tag>
                </div>
            </div>
			</div>
            <div>
                <button onClick={this.handleCommit}>確認</button>
            </div>
            </Modal.Body>
        </Modal>
            //</Dialog>
		);
	}
}