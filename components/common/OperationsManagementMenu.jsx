import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';

export default class OperationsManagementMenu extends React.Component {
	static contextTypes = {
		authData: React.PropTypes.object
	}
	constructor(props,context) {
		super(props,context);
		this.state = {
			permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : []
		};
	}

	render() {
		 return (
		 	<div className="btnBlock" style={{float:'right', width:'75%'}}>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_ENTERPRISE_CUSTOMER_MANAGMENT"]}>
					<a href="/admin/operationsManagement/corporateClient" style={{float:'left'}}>
						<img border="0" alt="企業客戶" src="/resource/operationsManagement1.png" width="100" height="100" />
					</a>
				</CheckPermission>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}>
					<a href="/admin/operationsManagement/careInstitution" style={{float:'left'}}>
						<img border="0" alt="照顧機構" src="/resource/operationsManagement2.png" width="100" height="100" />
					</a>
				</CheckPermission>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_CARE_MANAGER_MANAGMENT"]}>
					<a href="/admin/operationsManagement/careManager" style={{float:'left'}}>
						<img border="0" alt="照顧經理" src="/resource/operationsManagement3.png" width="100" height="100" />
					</a>
				</CheckPermission>
				<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_CARE_GIVER_MANAGMENT"]}>
					<a href="/admin/operationsManagement/careHousekeeper" style={{float:'left'}}>
						<img border="0" alt="照顧管家" src="/resource/operationsManagement4.png" width="100" height="100" />
					</a>
				</CheckPermission>
				{/*<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_CONTRACT"]}>*/}
					<a href="/admin/operationsManagement/contractManagement" style={{float:'left'}}>
						<img border="0" alt="合約管理" src="/resource/operationsManagement5.png" width="100" height="100" />
					</a>
				{/*</CheckPermission>*/}
				{/*<CheckPermission permissions={this.state.permissions} permission={mapUrlToPermission["HAPPINESS_ACCOUNTING"]}>*/}
					<a href="/admin/operationsManagement/accountingManagement" style={{float:'left'}}>
						<img border="0" alt="帳務管理" src="/resource/operationsManagement6.png" width="100" height="100" />
					</a>
				{/*</CheckPermission>*/}
	        </div>
		 );
	}
}