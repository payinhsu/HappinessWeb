import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import * as MemberActions from 'actions/MemberActions';

export default class EnableEmaiSetPwd extends React.Component {
	constructor(props) {
        super(props);
        console.log(props);

        this.state = {
        	"password_1" : "",
        	"password_2" : "",
        	"verifyCode" : this.props.location.query.verify
        };     
    }

	handleChangePwd(field, e) {
		this.state[field] = e.target.value; 
		(field == "password_1") ? this.setState({password_1: e.target.value}) : this.setState({password_2: e.target.value})
	} 

	setPwd = () => {
		console.log('componebt setPed...');
		if(this.state.password_1 != this.state.password_2) {
			alert("設定密碼與確認密碼需相同!");
		}
		else {
			let result = this.props.actions.enableEmail(this.state.verifyCode, this.state.password_1);
			console.log(result);

			window.location = '/';			
		}

	}


	render() {
		 return (
		 	<div>
		 		<Header/>
		 		<div>
					設定密碼 : <input name='password_1' value={this.state.password_1} onChange={this.handleChangePwd.bind(this, 'password_1')} /><br/><br/>
					確認密碼 : <input name='password_2' value={this.state.password_2} onChange={this.handleChangePwd.bind(this, 'password_2')} /><br/><br/>
					<button type="button" onClick={this.setPwd}>確認</button>
				</div>
	        </div> 
		 );
	}
}