import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';

export default class EnableEmail extends React.Component {
	constructor(props) {
        super(props);
        console.log(props);
    }

	render() {
		 return (
		 	<div>
		 		<Header/>
				<div>
					<p>
						{this.props.auth.profile.familyName}{this.props.auth.profile.firstName}{(this.props.auth.profile.sex == "0") ? "小姐" : "先生"}您好：
					</p>
					<p>
						歡迎您加入104銀髮幸福企業平台，敬邀您登入平台將簡介與相關資料填妥，以便開通資格，一起為104銀髮幸福企業努力。
						登入104銀髮幸福企業網站(驗證啟用)
					</p>
					<Link to={`/EnableEmailSetPwd?verify=test3@104`}>驗證啟用</Link>
					<br/>
					<label>帳號：{this.props.auth.profile.email}</label>
				</div>
	        </div>
		 );
	}
}