import React, { PropTypes } from 'react';
import Header from 'components/common/Header';
import {Link} from 'react-router';
import UpdateMember   from 'components/roleManagement/UpdateMember' ;
import * as RoleActions from 'actions/RoleActions' ;
import * as DefinitionActions from 'actions/DefinitionActions';

export default class MemberList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openUpdateMember : false,
            enterpriseEmployees: props.role.enterpriseEmployees,
            selectStr:"",
            suspendedMember: this.emptyEnterpriseEmployee(),
            updateMember:this.emptyEnterpriseEmployee(),
            roles:props.definition.roles
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            openUpdateMember: false,
            enterpriseEmployees: newProps.role.enterpriseEmployees,
            selectStr:"",
            suspendedMemberId:this.emptyEnterpriseEmployee(),
            updateMember:this.emptyEnterpriseEmployee(),
            roles:newProps.definition.roles
        });
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                RoleActions.getEnterpriseEmployeesRoles(store.getState().auth.employee.companyId)(store.dispatch, store.getState).then(() => {
                    DefinitionActions.getRoles()(store.dispatch, store.getState).then(() => callback());   
                });
            });
        }
    }

    emptyEnterpriseEmployee = () => {
        return {
            "memberId":"",
            "email":"",
            "roles":[],
            "name":""
        }
    };
    onCloseUpdateMember = () => {
        this.setState({openUpdateMember:false});
    }; 
    onCommitUpdateMember =(model) => {
        let apiModel = {"roleIds" : model.roles} ;
        this.props.actions.updateMemberRoles(this.props.auth.employee.companyId, model.memberId, apiModel) ;
    };
    openUpdateMember = (em) => {
        console.log(em) ;
        this.state.updateMember = em ;
        this.state.updateMember.roles = this.state.updateMember.roles.map(um => um.id);
        this.setState({updateMember:this.state.updateMember});
        this.setState({openUpdateMember:true});
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
            let enterpriseEmployees = this.props.role.enterpriseEmployees.filter(em => 
                em.email.indexOf(selectStr) >= 0
            ) ;
            this.setState({enterpriseEmployees:enterpriseEmployees});
        } else {
            this.setState({enterpriseEmployees:this.props.role.enterpriseEmployees});
        }
    };

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
                        顯示名單：<input value={this.state.selectStr}
                                        onChange={this.changeSelectStr.bind(this)}/> 
                        <button onClick={this.findEm}>查詢</button>
                    </div>
                    <div className="box">
                        <table>
                            <tbody>
                                <tr className="tr-blue">
                                    <th>帳號</th>
                                    <th>顯示名稱</th>
                                    <th>角色</th>
                                </tr>
                                {this.state.enterpriseEmployees.map(em => (
                                    <tr>
                                        <td><a href="javascript:void(0);"
                                                onClick={this.openUpdateMember.bind(this,em)}>
                                                {em.email}
                                            </a>
                                        </td>
                                        <td>{em.name}</td>
                                        <td>
                                            {em.roles.map(emrole =>( 
                                                <div>{emrole.name}</div> 
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <UpdateMember open={this.state.openUpdateMember} 
                    onRequestClose={this.onCloseUpdateMember} 
                    updateMember={this.state.updateMember}
                    roles={this.state.roles}
                    onCommit={this.onCommitUpdateMember}/>
            </div>
        );
    }
}