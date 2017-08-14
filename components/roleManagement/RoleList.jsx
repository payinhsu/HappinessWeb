import React, { PropTypes } from 'react';
import Header from 'components/common/Header';
import {Link} from 'react-router';
import AddRole   from 'components/roleManagement/AddRole' ;
import * as DefinitionActions from 'actions/DefinitionActions';

export default class RoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openAddRole : false, 
            roles: props.definition.roles, 
            role: this.emptyRole(), 
            permissionGroups: props.definition.permissionGroups,
            isNew: false
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            openAddRole: false, 
             roles: newProps.definition.roles,
             role: this.emptyRole(),
             permissionGroups: newProps.definition.permissionGroups,
             isNew: false
        });
    };

    emptyRole = () => {
        return {
            "id":"",
            "name" : "",
            "permissionIds": []
        }
    };
    onCloseAddRole = () => {
        this.setState({openAddRole:false});
    }; 

    openAddRole = () => {
        this.setState({isNew: true});
        this.setState({openAddRole:true});
    };

    openUpdateRole = (role) => {
        //console.log(role) ;
        this.state.role.name = role.name ;
        let permissionIds = [] ;
        role.permissionGroups.map(pg => (
            pg.permissions.map(ps => permissionIds.push(ps.id))
        ));
        this.state.role.permissionIds = permissionIds ;
        this.state.role.id = role.id ;
        //console.log(this.state.role.permissionIds) ;
        this.setState({isNew: false});
        this.setState({role: this.state.role});
        this.setState({openAddRole:true});
    };

    toCommitRole = (model) => {
        console.log("Robin test commit add Role: " + JSON.stringify(model)) ;
        this.setState({openAddRole:false});
        this.props.actions.createRole(model) ;
    };

    toUpdateRole = (model) => {
        console.log("Robin test commit update Role: " + JSON.stringify(model)) ;
        this.setState({openAddRole:false});
        this.props.actions.updateRole(model) ;
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                DefinitionActions.getRoles()(store.dispatch, store.getState).then(() => callback());
            });
        }
    }
    
    render() {
        // let permissions = (this.props.auth.permission && this.props.auth.permission.length) ? this.props.auth.permission : [];
        // let roles =  (this.props.auth.roles && this.props.auth.roles.length) ? this.props.auth.roles : [];
        // // let isPortalAdmin = roles.find(r => r === "PORTAL_ADMIN");
        // let isPortalCareManager = roles.find(r => r === "PORTAL_CARE_MANAGER");
        // let isWebViewPortal = permissions.find(p => p.id === "WEB_VIEW_PORTAL");
        // // let isWebViewMaster = permissions.find(p => p.id === "WEB_VIEW_MASTER");
        //
        // let masterStyle = {};
        // 這裡的邏輯待角色權限導入後需要進行修改.
        // if(isPortalCareManager && isWebViewPortal){
        //     masterStyle.display = 'none';     // CM 不可見 Master
        // }
        return (
            <div id="portal">
                <Header/>
                <div className="listBox">
                    <div className="serviceTTL">角色權限列表</div>
                    <div className="btnBlock">
                        <a href="javascript:void(0);" 
                          className="btn-default btn-oliveDrab float-right"
                          onClick={this.openAddRole}>
                            新增角色
                        </a>
                    </div>
                    <div className="box">
                        <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th>角色</th>
                                    <th>功能大項</th>
                                </tr>
                                {this.state.roles.map((role,index) => (
                                    <tr>
                                    <td><a href="javascript:void(0);"
                                            onClick={this.openUpdateRole.bind(this,role)}>
                                            {role.name}
                                        </a>
                                    </td>
                                    <td>{role.permissionGroups.map(pg => (
                                            pg.name
                                        )).join(", ")}</td>
                                </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
                <AddRole open={this.state.openAddRole} 
                    onRequestClose={this.onCloseAddRole} 
                    role={this.state.role} 
                    permissionGroups={this.state.permissionGroups} 
                    toCommit={this.toCommitRole}
                    toUpdate={this.toUpdateRole}
                    isNew={this.state.isNew}/>
            </div>
        );
    }
}