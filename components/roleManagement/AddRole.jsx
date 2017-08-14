import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import { Modal, Button, Image} from 'react-bootstrap';

export default class AddRole extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            open : props.open, 
            role: props.role,
            permissionGroups: props.permissionGroups,
            isNew: props.isNew 
        }
        //console.log("robin cons : " + JSON.stringify(this.state.replaceMain)) ;
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            role: newProps.role,
            permissionGroups: newProps.permissionGroups, 
            isNew: newProps.isNew
        };
        this.setState(nextState);
        //console.log("robin rece : " + JSON.stringify(this.state.replaceMain)) ;
    };

    handlePermissionCheck = (itemValue, e) => {
        //console.log(`${itemValue} checked: ${e.target.checked}`);
        let role = this.state.role;
        const checked = e.target.checked;
        if(checked)
            role.permissionIds.push(itemValue);
        else
            role.permissionIds.splice(role.permissionIds.indexOf(itemValue), 1);
        this.setState({role: this.state.role});
        //console.log(JSON.stringify(this.state.role.permissionIds));
    };

    handlePermissionAllCheck = (itemValue, e) => {
        //console.log(`${itemValue} All checked: ${e.target.checked}`);
        let role = this.state.role;
        // let questions = this.state.questions ;
        const checked = e.target.checked;
        let group = this.state.permissionGroups.find( p => p.id === itemValue )
        if(checked) {
            // clear array
            group.permissions.map(ps => {
                if(role.permissionIds.indexOf(ps.id) == 1)
                    role.permissionIds.splice(role.permissionIds.indexOf(ps.id), 1);
            });
            // add in array
            group.permissions.map(ps => {
                if(role.permissionIds.indexOf(ps.id) == -1)
                    role.permissionIds.push(ps.id);
            });
        } else {
            group.permissions.map(ps => {
                role.permissionIds.splice(role.permissionIds.indexOf(ps.id), 1);
            });
        }
        
        this.setState({role: this.state.role});
        //console.log(this.state.role.permissionIds);
    };

    checkAll = (groupId) => {
        let group = this.state.permissionGroups.find(pg => pg.id==groupId) ;
        let count = 0 ;
        group.permissions.map(ps =>{
            if(this.state.role.permissionIds.find(pi => pi == ps.id)) {
                count ++ ;
            }
        });
        if(count == group.permissions.length) {
            return true ;
        } else {
            return false ;
        }
    };

    changeRole(field, e){
        this.state.role[field] = e.target.value;
        this.setState({role:this.state.role});
    } ;

    handleClose = () => {
        this.setState({open: false});
        this.props.onRequestClose();
    };

    handleCommit = () => {
        this.setState({open:false}) ;
        if(this.state.isNew) {
            this.props.toCommit(this.state.role);
        } else {
            this.props.toUpdate(this.state.role);
        }
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
		return(
            // <Dialog
            //   contentStyle={{width:'90%', maxWidth: 'none'}}
            //   title={this.state.isNew ? "新增角色權限" : "編輯角色權限" }
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
                <Modal.Title><p>{this.state.isNew ? "新增角色權限" : "編輯角色權限" }</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div id="portal">
            <div className="listBox">
                <div className="box">
                    <tag>
                        角色名稱： <input value={this.state.role.name} 
                                         onChange={this.changeRole.bind(this,'name')} />
                        <table>
                        <tbody>
                            <tr className="tr-blue">
                                <th>功能大項</th>
                                <th>功能細項</th>
                                <th>說明</th>
                            </tr>
                            {this.state.permissionGroups.map((permission,index) => (
                                <tr className={index%2 ==0 ? "tr-lightblue" : ""}>
                                    <td>{permission.name}</td>
                                    <td>
                                        
                                            <div>
                                                <input id={`all_${index}`} type="checkbox" 
                                                  onChange={this.handlePermissionAllCheck.bind(this, permission.id)}
                                                  checked={this.checkAll(permission.id)}
                                                />
                                                    全選
                                            </div> 
                                    {permission.permissions.map(sub =>(
                                        <div>
                                            <input type="checkbox" 
                                                onChange={this.handlePermissionCheck.bind(this, sub.id)}
                                                checked={this.state.role.permissionIds.indexOf(sub.id) >= 0} />
                                            {sub.name}
                                        </div>
                                    ))}
                                    </td>
                                    <td>
                                    {permission.permissions.map(sub => (
                                        <div>{sub.description}</div>   
                                    ))}
                                    </td>
                                </tr>
                            ))}
                        
                        </tbody>
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