import React, { PropTypes } from 'react';
import {Link} from 'react-router';

export default class ContractManagementMenu extends React.Component {
	
	render() {
		 return (
		 	<div className="btnBlock" style={{float:'right', width:'65%'}}>
	            <a href="javascript:void(0);" style={{float:'left'}}>
					<img border="0" alt="客戶資料" src="/resource/customerManagement1.png" width="100" height="100" />
				</a>
	            <a href="javascript:void(0);" style={{float:'left'}}>
					<img border="0" alt="供應商-機構" src="/resource/customerManagement2.png" width="100" height="100" />
				</a>
	           	<a href="javascript:void(0);" style={{float:'left'}}>
					<img border="0" alt="供應商-個人" src="/resource/customerManagement3.png" width="100" height="100" />
				</a>
	        </div>
		 );
	}
}