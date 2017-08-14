import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import NavBar from './NavBar';

export default class UserConsole extends React.Component {

	static links = [
		{url:`/profilePicutre`, text:'上傳照片'},
		{url:`/`, text:'密碼變更'},
		{url:`/`, text:'會員規約'},
		{url:`/`, text:'登出'}
	];

	render() {

		return(
			<div id="customerConsole-view">
        		<NavBar links={UserConsole.links} />
      		</div>
		);

	}
}