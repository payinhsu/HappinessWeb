import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import OperationsManagementMenu from 'components/common/OperationsManagementMenu';

export default class AccountingManagement extends React.Component {

	handleSearch () {
		console.log("enter the hadle search!")
	}
	render() {
		 return (
		 	<div>
		 		<div style={{float:'right',width:'80%'}}>
		 			<input></input>
		 			&nbsp;&nbsp;
		 			<button className="btn-default btn-orange" onClick={this.handleSearch}>查詢</button>
	            	&nbsp;&nbsp;	
		 			<a href="javascript:void(0);">
		 				<img src="/resource/add.png" alt="新增"/>
		 			</a>
		 		</div>
		 	</div>
		 );
	}

}
