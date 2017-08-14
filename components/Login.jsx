import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import api from 'api/HappinessAPI';

export default class CheckMemberAuth extends React.Component {
	constructor(props) {
        super(props);
        console.log(props);
        if( typeof window === 'object' && (props.location.query.error_msg)) {
        	alert(props.location.query.error_msg);
        }

        this.state = {
        	//"email" : props.location.query.email,
        	//"password" : ""
        	"email" : "test3@104.com.tw",
        	"password" : "happiness",
        	"keepLogin": false
        };
    }

	handleChangeEmail = (e) => {
		e.preventDefault();
		this.setState({email: e.target.value});
	};

	handleChangepassword = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	};

	handleChangeKeepLogin = (e) => {
		this.setState({keepLogin: e.target.checked});
		console.log(this.state.keepLogin);
	};

	render() {
		 return (
		 	<div>
		 		<Header/>
		 		<form method='post' action='/doLogin'>
					帳號 : <input name='email' value={this.state.email} onChange={this.handleChangeEmail} /><br/><br/>
					密碼 : <input name='password' value={this.state.password} onChange={this.handleChangepassword} /><br/><br/>
					<input name='keepLogin' type="checkbox" onChange={this.handleChangeKeepLogin} />保持登入<br/><br/>
					<input type='submit' value='登入' />
				</form>
	        </div>
		 );
	}
}