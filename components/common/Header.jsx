import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import ChangePass 			from 'components/common/ChangePass' ;
import ProfilePicture 		from 'components/common/ProfilePicture' ;
import MemberStatute 		from 'components/common/statute/MemberStatute' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';

export default class Header extends React.Component {
	static contextTypes = {
		authData: React.PropTypes.object
	}
	constructor(props,context) {
        super(props);
        this.state = {
            openProfilePicture: false, 
            openChangePass: false,
            openMemberStatute: false,
			permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : [],
            profile: (context.authData && context.authData.profile) ? context.authData.profile  : []
        };

    }

    componentWillReceiveProps = newProps => {
        this.setState({
            openProfilePicture: false, 
            openChangePass: false,
            openMemberStatute: false
        });
    };

    openProfilePicture = () => {
    	this.setState({openProfilePicture:true});
    } ;
    onCloseProfilePicture = () => {
    	this.setState({openProfilePicture:false});
        this.setState({profile:this.props.auth.profile})
    };
    openChangePass = () => {
    	this.setState({openChangePass:true});
    };
    onCloseChangePass = () => {
    	this.setState({openChangePass:false});
    };
    openMemberStatute = () => {
    	this.setState({openMemberStatute:true});
    };
    onCloseMemberStatute = () => {
    	this.setState({openMemberStatute:false});
    };

	render() {
		let dropDownMenu = ""
		let profilePictureComponent = ""
		if (this.props.auth && this.props.auth.profile !== undefined)
		{	dropDownMenu = (
			<ul className="drop-down-menu float-right">
				<li><a href="#"><img src={this.state.profile.headPhoto === undefined ? "../resource/download.jpg" : this.state.profile.headPhoto} style={{height:'50px'}} /></a>
					<ul>
						<li><a href="javascript:void(0);" onClick={this.openProfilePicture}>上傳照片</a>
						</li>
						<li><a href="javascript:void(0);" onClick={this.openChangePass}>密碼變更</a>
						</li>
						<li><a href="javascript:void(0);" onClick={this.openMemberStatute}>會員規約</a>
						</li>
						<li><a href="/logout">登出</a>
						</li>
					</ul>
				</li>
			</ul>)

            profilePictureComponent = (
				<ProfilePicture open={this.state.openProfilePicture}
								onRequestClose={this.onCloseProfilePicture}
								auth={this.props.auth}/>

			)
		}

		 return (
		 	<div>
		 	<div style={{fontSize:"18px"}}><span>104銀髮幸福企業服務中心</span></div>
		 	<div className="btnBlock">
				{dropDownMenu}
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/usecalendar" className="btn-orange float-right" >Calendar</Link>
				<span className="float-right">&nbsp;&nbsp;</span>
				<Link to="/admin/employeeList" className="btn-orange float-right" >員工資料維護</Link>
                <span className="float-right">&nbsp;&nbsp;</span>
				<Link to="/admin/memberList" className="btn-orange float-right" >人員管理</Link>
				<span className="float-right">&nbsp;&nbsp;</span>
                <a href="/admin/roleList" className="btn-orange float-right" >權限管理</a>
                <span className="float-right">&nbsp;&nbsp;</span>
	            <a href="javascript:void(0);" className="btn-orange float-right" >服務紀錄</a>
	            <span className="float-right">&nbsp;&nbsp;</span>
	            <a href="/admin/employeeApplyService" className="btn-orange float-right" >個人保障資料維護</a>
				<span className="float-right">&nbsp;&nbsp;</span>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_ENTERPRISE_CUSTOMER_MANAGMENT"]}>
					<a href="/admin/operationsManagement/corporateClient" className="btn-orange float-right" >營運管理</a>
				</CheckPermission>
                <span className="float-right">&nbsp;&nbsp;</span>
                <a href="/admin/youtubePage" className="btn-orange float-right" >Youtube</a>
				<span className="float-right">&nbsp;&nbsp;</span>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_CONTACT"]}>
					<a href="/admin/careGiverManagement" className="btn-orange float-right" >管理中心</a>
				</CheckPermission>
				<span className="float-right">&nbsp;&nbsp;</span>
				<Link to="/admin/careManagerManagement" className="btn-orange float-right" >管理中心(CM端)</Link>
	        </div>
	        <MemberStatute open={this.state.openMemberStatute}
                    onRequestClose={this.onCloseMemberStatute} />
            <ChangePass open={this.state.openChangePass}
                    onRequestClose={this.onCloseChangePass} />
				{profilePictureComponent}
	        </div>
		 );
	}
}